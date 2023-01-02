import { useController, UseControllerProps } from 'react-hook-form';

import { RadioGroup } from '@headlessui/react';
import CheckIcon from '@components/CustomCheckIcon';

interface Props<T> {
  label?: string;
  items: Array<T>;
  titleExtractor: (item: T) => string;
  descriptionExtractor: (item: T) => string;
  valueExtractor: (item: T) => string | number;
  onSelect?: (item: T | null) => void;
}

function RadioGroupInput<T>({
  label,
  items = [],
  titleExtractor,
  valueExtractor,
  descriptionExtractor,
  onSelect,
  ...props
}: Props<T> & UseControllerProps) {
  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController(props);
  //const [selected, setSelected] = useState(items[0]);
  return (
    <div className="flex w-full flex-col gap-y-2 ">
      {label && (
        <small className={`font-Secondary px-1 uppercase text-gray-500`}>
          {label}
        </small>
      )}
      <div className="mx-auto w-full ">
        <RadioGroup
          value={value}
          onChange={(value: any) => {
            onChange(value);
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {items.map((item) => (
              <RadioGroup.Option
                key={valueExtractor(item)}
                value={valueExtractor(item)}
                className={({ active, checked }) =>
                  `${error ? 'border-red-500' : 'border-t-gray-200'} ${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                ${
                  checked
                    ? 'bg-sky-900 bg-opacity-75 text-white'
                    : 'bg-gray-100'
                }
                  relative flex cursor-pointer rounded-lg border px-5 py-4  focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {titleExtractor(item)}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>{descriptionExtractor(item)}</span>{' '}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default RadioGroupInput;
