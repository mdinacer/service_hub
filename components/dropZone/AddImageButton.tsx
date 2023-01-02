import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import ImageCropper from '@components/imageCropper/ImageCropper';
import Modal from '@components/modals/Modal';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface Props {
  onDrop: (file: File) => void;
}

const AddImageButton: React.FC<Props> = ({ onDrop }) => {
  const [cropperModalVisible, setCropperModalVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const closeCropperModal = () => setCropperModalVisible(false);

  const onDropAccepted = useCallback((acceptedFiles: Array<File>) => {
    if (!acceptedFiles.length) return;
    const [file] = acceptedFiles;
    setFile(file);
    setCropperModalVisible(true);
  }, []);

  const handleCroppedImage = (file?: File) => {
    if (file) {
      onDrop(file);
    }
    closeCropperModal();
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
          isDragActive
            ? 'border-green-500 dark:border-rose-500'
            : 'border-gray-200 dark:border-slate-400'
        }  relative flex h-full w-full  flex-auto cursor-pointer items-center justify-center rounded-md border-dotted bg-gray-100 p-2  text-black dark:bg-slate-300 dark:text-slate-700`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="relative flex-auto text-3xl">Drop the files here...</p>
        ) : (
          <div
            className={`flex flex-auto flex-col items-center justify-center gap-y-3 text-center`}
          >
            <PhotoIcon className=" h-12 w-12" />
            <small>Drop your image here, or click to select one</small>
          </div>
        )}
      </div>

      {file && (
        <Modal
          visible={cropperModalVisible}
          onClose={closeCropperModal}
          className=" aspect-square  overflow-hidden  rounded-md bg-black p-4 lg:min-w-[50vw]"
        >
          <ImageCropper file={file} onClose={handleCroppedImage} />
        </Modal>
      )}
    </>
  );
};

export default AddImageButton;
