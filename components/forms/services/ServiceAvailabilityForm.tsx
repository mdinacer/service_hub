import TimePicker from '@components/TimePicker';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ServiceAvailability } from '@models/service-availability';
import { Weekday } from '@models/week-days';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ServiceAvailabilityForm: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const { availability } = watch();

  const [availabilityItems, setAvailabilityItems] = useState<
    Array<ServiceAvailability>
  >(availability ?? []);

  const handleSelectItem = (index: number) => {
    const itemIndex = availabilityItems.findIndex((i) => i.day === index);

    const itemExists = itemIndex > -1;

    if (itemExists) {
      setAvailabilityItems((prev) => prev.filter((i) => i.day !== index));
    } else {
      setAvailabilityItems((prev) => [
        ...prev,
        {
          day: index,
          startTime: '0',
          endTime: '0'
        }
      ]);
    }
  };

  const handleUpdateTime = (
    index: number,
    name: 'startTime' | 'endTime',
    value: string
  ) => {
    setAvailabilityItems((prev) =>
      prev.map((item) =>
        item.day === index ? { ...item, [name]: value } : item
      )
    );
  };

  const getItem = (index: number) =>
    availabilityItems.find((i) => i.day === index);

  const isSelected = (index: number) => {
    return availabilityItems.findIndex((i) => i.day === index) > -1;
  };

  useEffect(() => {
    setValue('availability', availabilityItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availabilityItems]);

  return (
    <div className=" flex flex-col gap-y-2">
      <small
        className={`font-Secondary px-1 uppercase text-gray-500 dark:text-slate-400`}
      >
        Availability
      </small>
      <div className=" grid gap-y-4">
        {Array.from(Array(7).keys()).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center  justify-start gap-x-4 overflow-hidden rounded border border-gray-200 bg-gray-50  dark:border-slate-500 dark:bg-slate-400"
          >
            <div className=" flex aspect-square h-full flex-initial shrink-0 items-center justify-center bg-gray-200 dark:bg-slate-500">
              <button
                type="button"
                aria-label="Add availability"
                onClick={() => handleSelectItem(index)}
                className={` flex items-center  justify-center rounded-full bg-gray-500 p-1 text-gray-300 ${
                  isSelected(index)
                    ? ' text-black dark:bg-rose-500 dark:text-white'
                    : ' text-gray-300 dark:text-slate-400'
                }`}
              >
                {<CheckIcon className={` h-5 w-5 `} />}
              </button>
            </div>
            <div
              className={` flex w-full flex-auto flex-row justify-between  py-1 pr-4 transition-all duration-300 ${
                isSelected(index) ? ' opacity-100' : 'opacity-25'
              }`}
            >
              <div className=" flex-auto ">
                <span className=" text-lg  ">{Weekday[index]}</span>
              </div>
              <div className=" flex flex-row gap-x-8">
                <div className=" inline-flex items-center justify-between gap-x-2">
                  <small>Start</small>
                  <TimePicker
                    value={getItem(index)?.startTime}
                    onChange={(value) =>
                      handleUpdateTime(index, 'startTime', value)
                    }
                  />
                </div>
                <div className=" inline-flex items-center justify-between gap-x-2">
                  <small>End</small>
                  <TimePicker
                    value={getItem(index)?.endTime}
                    onChange={(value) =>
                      handleUpdateTime(index, 'endTime', value)
                    }
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAvailabilityForm;

type AvailabilityListItem = {
  day: string;
  selected: boolean;
  index: number;
  startTime: string;
  endTime: string;
};
