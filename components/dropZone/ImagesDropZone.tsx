/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import AddImageButton from './AddImageButton';
import FileImageCard from './FileImageCard';

type Props = {
  onChange: (images: Array<File>) => void;
  maxFiles?: number;
};

export default function ImagesDropZone({ maxFiles = 20, onChange }: Props) {
  const { watch } = useFormContext();
  const { images: currentImages } = watch();
  const [images, setImages] = useState<Array<File>>(currentImages ?? []);

  const handleAddImage = useCallback((file: File) => {
    setImages((prev) => [...prev, file]);
  }, []);

  const handleRemoveImage = (file: File) => {
    setImages((prev) => prev.filter((image) => image.name !== file.name));
  };

  useEffect(() => {
    onChange(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      {images.map((image: any, index) => {
        return (
          <FileImageCard
            key={index}
            url={image.preview}
            onRemove={() => handleRemoveImage(image)}
          />
        );
      })}

      {images.length < maxFiles && <AddImageButton onDrop={handleAddImage} />}
    </>
  );
}
