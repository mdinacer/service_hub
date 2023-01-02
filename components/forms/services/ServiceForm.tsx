import React, { useMemo } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocationInput } from '@models/location';
import { ServiceAvailability } from '@models/service-availability';

import ServiceAvailabilityForm from './ServiceAvailabilityForm';
import ServiceDetailsForm from './ServiceDetailsForm';
import ServiceImagesForm from './ServiceImagesForm';
import ServiceLocationForm from './ServiceLocationForm';
import ServiceOverviewForm from './ServiceOverviewForm';
import { uploadAssetAsync } from '@services/assetsService';
import agent from '@services/agent';
import { Weekday } from '@models/week-days';

interface Props {
  onClose: () => void;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const ServiceForm: React.FC<Props> = ({ onClose }) => {
  const methods = useForm<FieldValues>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    formState: { isDirty, isValid, isSubmitting },
    handleSubmit
  } = methods;

  async function handleSubmitData(data: FieldValues) {
    console.log(data);
    try {
      const {
        category: categoryId,
        images,
        serviceCategoryName,
        serviceTypeName,
        type: serviceTypeId,
        location,
        availability,
        durationUnit,
        duration,
        ...values
      } = data;

      let imagesIds: Array<any> = [];

      if (images && Array.isArray(images)) {
        for (const image of images) {
          const uploadResult = await uploadAssetAsync(image);
          if (uploadResult) {
            imagesIds.push({ id: uploadResult.id });
          }
        }
      }

      let item: any = {
        ...values,
        availability: {
          create: availability.map((i: ServiceAvailability) => ({
            ...i,
            day: Weekday[i.day]
          }))
        },
        category: { connect: { id: categoryId } },
        serviceType: { connect: { id: serviceTypeId } },
        images: { connect: imagesIds },
        rating: 0,

        location: location
          ? { longitude: +location.longitude, latitude: +location.latitude }
          : null
      };

      if (durationUnit && duration > 0) {
        item = Object.assign(item, {
          durationUnit,
          duration
        });
      }

      const result = await agent.Services.create(item);

      console.log(result);
      // clean up image preview
    } catch (error) {
      console.error(error);
    }
  }

  const tabs = useMemo(
    () => [
      { title: 'Details', Content: ServiceDetailsForm },
      // { title: 'Category', Content: ServiceCategoryForm },
      { title: 'Images', Content: ServiceImagesForm },
      { title: 'Location', Content: ServiceLocationForm },
      { title: 'Availability', Content: ServiceAvailabilityForm },
      { title: 'Overview', Content: ServiceOverviewForm }
    ],
    []
  );

  return (
    <>
      <div className="max-w-7xl overflow-hidden rounded-md  bg-white text-slate-900 dark:bg-slate-800 dark:text-white">
        <div className=" flex h-16 w-full flex-row items-center justify-between px-5">
          <p className=" text-3xl font-semibold capitalize">Create a service</p>
          <button type="button" className="p-2" onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleSubmitData)}
            className={'flex flex-col items-stretch  '}
          >
            <Tab.Group>
              <Tab.List className="flex space-x-1  py-1 px-4 ">
                {tabs.map(({ title }) => (
                  <Tab
                    key={title}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'focus:outline-none ',
                        selected
                          ? 'bg-white dark:bg-rose-600'
                          : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2 flex aspect-square w-[40vw] flex-col items-stretch justify-start bg-gray-100 dark:bg-slate-700  ">
                {tabs.map(({ Content }, index) => (
                  <Tab.Panel key={index} className={'w-full rounded  p-3'}>
                    <Content />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className=" flex h-16 w-full items-center justify-between  border border-b-gray-200 bg-gray-100 p-4 dark:border-slate-900 dark:bg-slate-800">
              <button
                disabled={!isValid || !isDirty || isSubmitting}
                aria-disabled={!isValid || !isDirty || isSubmitting}
                type="submit"
                className={`${buttonsStyle} border-gray-200 bg-sky-500 text-white dark:border-rose-700 dark:bg-rose-700 dark:hover:bg-rose-500`}
              >
                Save
              </button>
              <button
                onClick={onClose}
                type="button"
                className={`${buttonsStyle} border-sky-500 bg-gray-50 text-sky-700 dark:border-slate-600 dark:bg-slate-400 dark:text-slate-800 dark:hover:bg-slate-300
                `}
              >
                {isDirty ? 'Cancel' : 'Close'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ServiceForm;

const buttonsStyle =
  'rounded-md border  py-2 px-4 text-sm uppercase min-w-[8rem]   disabled:opacity-25';

type FormType = {
  availability: Array<ServiceAvailability>;
  category: string;
  description: string;
  duration: number;
  durationUnit: string;
  images: Array<File>;
  location: LocationInput;
  locationType: string;
  name: string;
  price: number;
  type: string;
};

const defaultValues: FormType = {
  availability: [],
  category: '',
  description: '',
  duration: 0,
  durationUnit: '',
  images: [],
  location: { latitude: 0, longitude: 0 },
  locationType: 'fixed',
  name: '',
  price: 0,
  type: ''
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required().min(50),
  price: yup.number().required().min(0),
  category: yup.string().required(),
  type: yup.string().required(),
  location: yup
    .object()
    .shape({
      latitude: yup.string().required(),
      longitude: yup.string().required()
    })
    .nullable(),
  images: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          'fileFormat',
          'Unsupported file format',
          (value) => value instanceof File && value.type.startsWith('image/')
        )
    )
    .min(1, 'Please select at least one image')
});
