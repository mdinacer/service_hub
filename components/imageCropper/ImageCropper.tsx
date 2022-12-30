import 'cropperjs/dist/cropper.css';

import { useCallback, useReducer, useRef } from 'react';
import { Cropper } from 'react-cropper';

import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import {
  imageCropperReducer,
  imageCropperReducerInitialState
} from './imageCropperReducer';

interface Props {
  file: File;
  onClose: (file?: File) => void;
}

const ImageCropper: React.FC<Props> = ({ file, onClose }) => {
  const ref = useRef<any>(null);

  const [state, dispatch] = useReducer(
    imageCropperReducer,
    imageCropperReducerInitialState
  );

  const { cropper, image, width, height, fileName } = state;

  const setCropper = (cropper: Cropper | null) =>
    dispatch({ type: 'SET_CROPPER', cropper });

  const setFileName = (fileName: string) =>
    dispatch({ type: 'SET_FILE_NAME', fileName });

  const setHeight = (height: number) =>
    dispatch({ type: 'SET_HEIGHT', height });

  const setImage = (image: string) => dispatch({ type: 'SET_IMAGE', image });

  const setWidth = (width: number) => dispatch({ type: 'SET_WIDTH', width });

  function onCrop(event: Cropper.CropEvent<HTMLImageElement>) {
    let width = event.detail.width;
    let height = event.detail.height;

    setWidth(Math.trunc(width));
    setHeight(Math.trunc(height));
  }

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFileName(file.name);
  }, []);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      cropper?.getCroppedCanvas().toBlob((blob: Blob | null) => {
        let file = new File([blob!], fileName, {
          type: blob!.type
        });

        file = Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        onClose(file);
      });
    }
  };

  useEffect(() => {
    readFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex h-full w-full flex-1 bg-black">
      <Cropper
        aspectRatio={1}
        autoCropArea={1}
        background={true}
        center
        checkOrientation={false}
        className=" m-10 h-full flex-1"
        crop={onCrop}
        cropBoxMovable
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        movable
        preview=".img-preview"
        ref={ref}
        responsive={true}
        src={image}
        viewMode={1}
        onInitialized={(instance: Cropper) => {
          setCropper(instance);
        }}
        guides={true}
      />

      <div className=" img-preview absolute top-2 left-2 hidden h-52 w-52 origin-top-left  scale-50 overflow-hidden object-contain opacity-50 transition-all duration-300 hover:scale-100 hover:opacity-100 lg:block" />

      <div className=" absolute bottom-0 left-0 right-0  flex w-full flex-col items-end justify-between bg-black bg-opacity-70 py-1 px-4 text-white lg:flex-row lg:bg-opacity-40">
        <div className=" font-Secondary hidden gap-x-5 text-sm font-light md:flex-row lg:flex lg:flex-col ">
          <p>
            <span className=" text-xs font-semibold uppercase">height: </span>
            <span>{height} px</span>
          </p>
          <p>
            <span className=" text-xs font-semibold uppercase">width: </span>
            <span>{width} px</span>
          </p>
        </div>

        <div className=" flow-row font-Secondary flex w-full items-center justify-around gap-x-4 text-base lg:w-auto ">
          <button
            type="button"
            title="Crop image"
            className=" inline-flex items-center rounded px-2  py-1 md:px-4"
            onClick={getCropData}
          >
            <CheckIcon className="h-10 w-10 fill-white md:h-7 md:w-7" />
            <span className=" ml-2">Save</span>
          </button>

          <button
            title="Remove image"
            onClick={() => onClose()}
            className=" inline-flex items-center py-1 md:px-4"
            type="button"
          >
            <TrashIcon className="h-6 w-6 fill-white" />
            <span className=" ml-2">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
