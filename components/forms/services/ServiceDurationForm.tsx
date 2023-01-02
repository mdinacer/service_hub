import React from 'react';
import { useFormContext } from 'react-hook-form';
import ListboxInput from '../inputs/Listbox';
import NumberFieldInput from '../inputs/NumberFieldInput';

const ServiceDurationForm: React.FC = () => {
  const { control, watch } = useFormContext();
  const { durationUnit } = watch();

  return (
    <div className=" flex flex-col gap-y-2">
      <small
        className={` font-Secondary px-1 uppercase text-gray-500 dark:text-gray-400`}
      >
        Service duration
      </small>
      <div className="grid grid-cols-2 gap-4">
        <ListboxInput
          control={control}
          name="durationUnit"
          items={durationTypes}
          placeholder="Duration unit"
        />
        <NumberFieldInput
          disabled={!durationUnit}
          min={0}
          name={'duration'}
          control={control}
          prefix={
            durationUnit
              ? durationTypes.find((d) => d.value === durationUnit)?.title
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default ServiceDurationForm;

const durationTypes = [
  { title: 'Not applicable', value: '' },
  { title: 'Minutes', value: 'minute' },
  { title: 'Hours', value: 'hour' },
  { title: 'Days', value: 'day' },
  { title: 'Weeks', value: 'week' },
  { title: 'Months', value: 'Mont' },
  { title: 'Year', value: 'year' }
];
