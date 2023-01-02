import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

interface Props {
  url: string;
  onRemove: () => void;
}

const FileImageCard: React.FC<Props> = ({ url, onRemove }) => {
  return (
    <div
      className={
        'md:min-h-48 relative flex  aspect-square  w-full flex-col items-stretch justify-end overflow-hidden rounded border border-gray-200 bg-gray-200 md:w-full '
      }
    >
      <Image
        fill
        className="absolute  bottom-0 left-0 right-0 h-full w-full overflow-hidden object-fill   "
        src={url}
        alt="preview"
      />

      <div className=" absolute left-0  top-0 w-full duration-300 ">
        <button
          type="button"
          aria-label="Remove image"
          title="remove"
          onClick={onRemove}
          className=" flex aspect-square w-8 items-center justify-center rounded-br bg-red-600 py-1 text-white"
        >
          <TrashIcon className=" h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FileImageCard;
