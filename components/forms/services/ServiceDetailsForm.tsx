import React from 'react';
import { useFormContext } from 'react-hook-form';

import CurrencyFieldInput from '../inputs/CurrencyFieldInput';
import TextAreaInput from '../inputs/TextAreaInput';
import TextFieldInput from '../inputs/TextFieldInput';
import ServiceCategoryForm from './ServiceCategoryForm';
import ServiceDurationForm from './ServiceDurationForm';

const ServiceDetailsForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className=" flex w-full flex-col gap-y-4">
      <TextFieldInput
        label="Title"
        control={control}
        name={'name'}
        placeholder="Enter a title for your service"
      />

      <CurrencyFieldInput label="Price" control={control} name="price" />

      <ServiceCategoryForm />

      <ServiceDurationForm />

      <TextAreaInput
        placeholder="Enter a brief description of your service"
        label="Description"
        control={control}
        name={'description'}
        rows={4}
      />
    </div>
  );
};

export default ServiceDetailsForm;
