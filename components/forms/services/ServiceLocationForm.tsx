import useGeolocation from 'hooks/useGeolocation';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { RadioGroup } from '@headlessui/react';
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/24/outline';
import CheckIcon from '@components/CustomCheckIcon';

const ServiceLocationForm: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const { location } = useGeolocation();

  const { locationType } = watch();

  const handleChange = (value: any) => {
    setValue('locationType', value, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  useEffect(() => {
    if (location) {
      setValue('location', location, { shouldDirty: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <div className="flex w-full select-none flex-col gap-y-2 ">
      <small className={`font-Secondary px-1 uppercase text-gray-500`}>
        Service Location
      </small>
      <div className="mx-auto w-full ">
        <RadioGroup value={locationType} onChange={handleChange}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {serviceLocalisationType.map(
              ({ title, value, description, Icon }, index) => (
                <RadioGroup.Option
                  key={index}
                  value={value}
                  className={({ active, checked }) =>
                    ` ${active ? 'border-t-gray-200 ' : ''}
              ${
                checked
                  ? 'bg-sky-900 bg-opacity-75 text-white dark:border-rose-700 dark:bg-rose-500'
                  : 'bg-gray-100 dark:border-slate-700 dark:bg-slate-500 dark:text-slate-300'
              }
                relative flex cursor-pointer rounded-lg border px-5 py-4 focus:outline-none `
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-start gap-x-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12 ${
                            checked ? 'text-white ' : 'text-gray-300'
                          }`}
                        >
                          <Icon aria-hidden="true" />
                        </div>
                        <div className="flex flex-auto items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked
                                  ? 'text-white dark:text-slate-100'
                                  : 'text-gray-900 dark:text-slate-300'
                              }`}
                            >
                              {title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked
                                  ? 'text-sky-100 dark:text-rose-200'
                                  : 'text-gray-500 dark:text-slate-400'
                              }`}
                            >
                              <span>{description}</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-initial shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              )
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ServiceLocationForm;

const serviceLocalisationType = [
  {
    Icon: BuildingStorefrontIcon,
    title: 'Fixed Location',
    value: 'fixed',
    description:
      'Services are performed at a fixed location, such as a shop or workshop.'
  },
  {
    Icon: TruckIcon,
    title: 'Mobile service',
    value: 'mobile',
    description: `Services are performed at the customer's location, such as at their home or office.`
  }
];
