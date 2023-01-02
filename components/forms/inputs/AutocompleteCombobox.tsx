import { Fragment, useCallback, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Props<T> {
  label?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
  items: Array<T>;
  disabled?: boolean;
  titleExtractor: (item: T) => string;
  valueExtractor: (item: T) => string | number;
  onSelect?: (item: T | null) => void;
}

function AutocompleteCombobox<T>({
  label,
  items,
  disabled,
  onSelect,
  titleExtractor,
  valueExtractor,
  ...props
}: Props<T> & UseControllerProps) {
  const [query, setQuery] = useState('');

  const {
    field: { value, onChange }
  } = useController(props);

  const getSelectedItem = useCallback(() => {
    const item = items.find((item) => valueExtractor(item) === value);

    return item ? titleExtractor(item) : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, items]);

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          titleExtractor(item)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className={` ${inputStyles.container}`}>
      {label && <small className={` ${inputStyles.label}`}>{label}</small>}
      <Combobox
        disabled={disabled}
        value={value}
        onChange={(item) => {
          onChange(valueExtractor(item));
          if (onSelect) onSelect(item);
        }}
      >
        <div
          className={` relative ${disabled ? ' opacity-25' : ' opacity-100'}`}
        >
          <div className={` ${inputStyles.inputContainer}`}>
            <Combobox.Input
              className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0 dark:text-slate-200"
              displayValue={(value: string) => getSelectedItem()}
              onChange={({ target }) => setQuery(target.value)}
              placeholder={props.placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-500 sm:text-sm">
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={valueExtractor(item)}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-rose-600 text-white'
                          : 'text-gray-900 dark:text-slate-300'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {titleExtractor(item)}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AutocompleteCombobox;

const inputStyles = {
  container: 'flex flex-col gap-y-2 ',
  label: 'font-Secondary uppercase text-gray-500 px-1',
  inputContainer:
    'dark:bg-slate-600 dark:border-slate-800 dark:placeholder:text-slate-400 dark:hover:bg-slate-500 dark:focus:bg-slate-400 relative w-full overflow-hidden rounded-md border bg-gray-100 text-left transition-all duration-200 hover:bg-gray-50 focus:bg-white focus:outline-none sm:text-sm ',
  input: 'focus:outline-none  bg-transparent flex-auto text-center  w-full'
};
