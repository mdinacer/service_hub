import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

import ImageCropper from '../imageCropper/ImageCropper';
import Modal from '../modals/Modal';

interface Props extends UseControllerProps {}

const ImageDropZone: React.FC<Props> = (props) => {
  const [cropperModalVisible, setCropperModalVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const openCropperModal = () => setCropperModalVisible(true);
  const closeCropperModal = () => setCropperModalVisible(false);

  const {
    field: { onChange }
  } = useController({
    ...props,
    defaultValue: null
  });
  const onDropAccepted = useCallback((acceptedFiles: Array<File>) => {
    if (!acceptedFiles.length) return;
    const [file] = acceptedFiles;
    setFile(file);
    setCropperModalVisible(true);
  }, []);

  const handleCroppedImage = (file?: File) => {
    if (!file) return;
    onChange(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.avif']
    },
    maxFiles: 1,
    multiple: false,
    onDropAccepted
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? 'border-green-500' : 'border-gray-200'
        }  relative  flex h-full w-full flex-auto cursor-pointer items-center justify-center  rounded-md border-dotted text-black`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="relative flex-auto text-3xl">Drop the files here...</p>
        ) : (
          <div
            className={`flex flex-auto flex-col items-center justify-center gap-y-3`}
          >
            <p>Drop your image here, or click to select one</p>
          </div>
        )}
      </div>

      {file && (
        <Modal visible={cropperModalVisible} onClose={closeCropperModal}>
          <ImageCropper file={file} onClose={handleCroppedImage} />
        </Modal>
      )}
    </>
  );
};

export default ImageDropZone;
