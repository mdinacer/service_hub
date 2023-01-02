import { ServiceAvailability } from '@models/service-availability';
import { Weekday } from '@models/week-days';
import useGeolocation from 'hooks/useGeolocation';
import Image from 'next/image';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ServiceOverviewForm: React.FC = () => {
  const { address } = useGeolocation();
  const {
    watch,
    formState: { errors }
  } = useFormContext();
  const {
    duration,
    durationUnit,
    availability,
    description,
    images,
    locationType,
    name,
    price,
    serviceCategoryName,
    serviceTypeName
  } = watch();

  return (
    <div className=" flex max-h-full w-full flex-col items-stretch gap-y-6 overflow-y-auto bg-gray-100 dark:bg-slate-700">
      <div className="  flex flex-col gap-y-2">
        <div className="mb-2 flex w-full flex-row items-end justify-between">
          <div>
            {name && (
              <div>
                <p className=" text-3xl capitalize">{name}</p>
              </div>
            )}
            {serviceCategoryName && (
              <span
                className={`font-Secondary capitalize text-gray-500 dark:text-slate-200`}
              >
                {serviceCategoryName} - {serviceTypeName}
              </span>
            )}
          </div>
          <div>
            <span className=" text-2xl font-semibold">
              $ {(+price).toFixed(2)}
            </span>
            {duration > 0 && durationUnit && (
              <span className="capitalize">
                {` / ${duration} ${durationUnit}${duration > 1 ? 's' : ''}`}
              </span>
            )}
          </div>
        </div>
        {description && (
          <div>
            <span className=" text-gray-500 dark:text-slate-300">
              {description}
            </span>
          </div>
        )}
      </div>

      {images && (
        <div className=" flex flex-col gap-y-2">
          {/* <small
            className={`font-Secondary px-1 uppercase text-gray-500 dark:text-slate-400`}
          >
            Images
          </small> */}
          <div className="flex flex-row gap-4">
            {Array.from<any>(images).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square  w-20 overflow-hidden rounded dark:bg-slate-300"
              >
                <Image src={image.preview} alt={image.name} fill />
              </div>
            ))}
          </div>
        </div>
      )}

      {locationType && (
        <>
          {locationType === 'fixed' ? (
            <div className="flex flex-col px-2 py-1 text-base ">
              <span className="dark:text-slate-300">
                This services is performed at a fixed location
              </span>
              <span className="dark:text-slate-200">{address}</span>
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}

      {availability && (
        <div className=" flex flex-col gap-y-2">
          <small
            className={`font-Secondary px-1 uppercase text-gray-500 dark:text-slate-400`}
          >
            Availability
          </small>
          <div className="grid  grid-cols-4 gap-4">
            {Array.from<ServiceAvailability>(availability).map(
              (item, index) => (
                <div
                  className=" rounded py-1 px-2 text-center dark:bg-slate-300 dark:text-slate-700"
                  key={index}
                >
                  <p className=" text-sm">{Weekday[item.day]}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
      {/* <code className="w-full whitespace-pre text-sm">
        {JSON.stringify(watch(), null, 1)}
        {JSON.stringify(errors, null, 1)}
      </code> */}
    </div>
  );
};

export default ServiceOverviewForm;
