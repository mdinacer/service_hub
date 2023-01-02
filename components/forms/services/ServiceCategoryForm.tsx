import { ServiceCategory } from '@models/service-category';
import { ServiceType } from '@models/service-type';
import useCategories from 'hooks/useCategories';
import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AutocompleteCombobox from '../inputs/AutocompleteCombobox';

const ServiceCategoryForm: React.FC = () => {
  const { control, setValue, watch } = useFormContext();
  const { category } = watch();

  const { categories } = useCategories();

  const selectedCategoryValue = useMemo(
    () => categories.find((c) => c.id === category),
    [categories, category]
  );

  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(selectedCategoryValue ?? null);

  const handleCategoryChange = (category: ServiceCategory | null) => {
    setSelectedCategory(category);
    setValue('serviceCategoryName', category?.name, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  const handleTypeChange = (type: ServiceType | null) => {
    setValue('serviceTypeName', type?.name, {
      shouldDirty: true,
      shouldValidate: true
    });
    //setSelectedCategory(category);
  };
  return (
    <>
      <AutocompleteCombobox<ServiceCategory>
        placeholder="Select the category of your service"
        items={categories}
        label="Category"
        control={control}
        name={'category'}
        titleExtractor={({ name }) => name}
        valueExtractor={({ id }) => id}
        onSelect={handleCategoryChange}
      />

      <AutocompleteCombobox<ServiceType>
        placeholder="Select the type of your service"
        items={selectedCategory?.types ?? []}
        label="Type"
        disabled={!selectedCategory}
        control={control}
        name={'type'}
        titleExtractor={({ name }) => name}
        valueExtractor={({ id }) => id}
        onSelect={handleTypeChange}
      />
    </>
  );
};

export default ServiceCategoryForm;
