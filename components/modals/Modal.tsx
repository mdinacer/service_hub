import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  title?: string;
  visible: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  className,
  title,
  visible,
  onClose
}: Props) {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`max-h-screen overflow-y-auto transition-all ${
                  className ??
                  'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl'
                }`}
              >
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-darkBlue mb-4 text-xl uppercase"
                  >
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
