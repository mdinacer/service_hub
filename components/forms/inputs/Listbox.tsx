import React, { Fragment, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useController, UseControllerProps } from 'react-hook-form';

type ItemType = {
  title: string;
  value: string | number;
};

interface Props {
  label?: string;
  items: Array<ItemType>;
  placeholder?: string;
}

const ListboxInput: React.FC<Props & UseControllerProps> = ({
  label,
  items = [],
  placeholder,
  ...props
}) => {
  const {
    field: { value, onChange }
  } = useController(props);
  const selected = useMemo(
    () => items.find((i) => i.value === value),
    [items, value]
  );

  return (
    <div className="relative">
      {label && <small className={` ${inputStyles.label}`}>{label}</small>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative ">
          <Listbox.Button className="relative h-11 w-full cursor-default rounded-md border border-gray-200  bg-gray-100 py-2 pl-3 pr-10 text-left hover:bg-gray-50 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-600 dark:placeholder:text-slate-400 dark:hover:bg-slate-500 dark:focus:bg-slate-400  sm:text-sm">
            {selected ? (
              <span className="block truncate">{selected.title}</span>
            ) : (
              <span className="clear-left block truncate text-sm">
                {placeholder ?? 'Select'}
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-500 sm:text-sm">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-amber-100 text-amber-900 dark:bg-rose-100 dark:text-rose-900'
                        : 'text-gray-900 dark:text-slate-300'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-rose-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListboxInput;

const inputStyles = {
  container: 'flex flex-col gap-y-2 ',
  label: 'font-Secondary uppercase text-gray-500 px-1 dark:text-gray-400',
  inputContainer:
    'relative w-full overflow-hidden rounded-md border bg-gray-100 text-left transition-all duration-200 hover:bg-gray-50 focus:bg-white focus:outline-none sm:text-sm ',
  input: 'focus:outline-none  bg-transparent flex-auto text-center  w-full'
};
