import ImagesDropZone from '@components/dropZone/ImagesDropZone';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const maxItems = 4;

const ServiceImagesForm: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const { images } = watch();

  const handleImagesChange = (files: Array<File>) => {
    setValue('images', files, { shouldDirty: true, shouldValidate: true });
  };
  return (
    <div className=" flex flex-col items-stretch gap-y-2">
      <small
        className={`font-Secondary px-1 uppercase text-gray-500 dark:text-slate-400`}
      >
        Images
      </small>
      <div className=" grid grid-cols-2 grid-rows-2 gap-4">
        <ImagesDropZone maxFiles={maxItems} onChange={handleImagesChange} />
        {images.length < 4 &&
          Array.from(Array(maxItems - 1 - images.length ?? 0).keys()).map(
            (item) => (
              <div
                key={item}
                className=" flex  aspect-square w-full items-center justify-center rounded  border border-gray-200 bg-gray-50 py-1 dark:border-slate-600 dark:bg-slate-500"
              >
                <span className=" text-3xl text-gray-200 dark:text-slate-400">
                  {item + 2 + images.length}
                </span>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ServiceImagesForm;
