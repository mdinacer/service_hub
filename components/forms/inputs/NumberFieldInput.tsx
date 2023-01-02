import React, { ChangeEvent, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Props extends UseControllerProps {
  label?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
  prefix?: string;
  suffix?: string;
  max?: number;
  min?: number;
  step?: number;
  disabled?: boolean;
}

const NumberFieldInput: React.FC<Props> = ({
  prefix,
  suffix,
  disabled,
  ...props
}) => {
  const {
    fieldState: { error },
    field
  } = useController({
    ...props
  });
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );
  const [fieldValue, setFieldValue] = useState(+field.value ?? 0);

  const handleIncrease = () => {
    if (inputElement) {
      inputElement.stepUp();
      field.onChange(+inputElement.value);
      setFieldValue(+inputElement.value);
    }
  };

  const handleDecrease = () => {
    if (inputElement) {
      inputElement.stepDown();
      field.onChange(+inputElement.value.replace(',', '.'));
      setFieldValue(+inputElement.value.replace(',', '.'));
    }
  };

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value }
    } = e;

    setFieldValue(+value);
    field.onChange(+value);
  }

  return (
    <div className={` ${inputStyles.container}`}>
      {props.label && (
        <small className={` ${inputStyles.label}`}>{props.label}</small>
      )}
      <div
        aria-disabled={disabled}
        className={`${
          disabled
            ? ' opacity-25'
            : 'bg-gray-100 hover:bg-gray-50 focus:bg-white'
        } inline-flex h-11 w-full overflow-hidden rounded-md border border-gray-200 transition-all duration-200 dark:border-slate-800 dark:bg-slate-600 dark:placeholder:text-slate-400   dark:hover:bg-slate-500 dark:focus:bg-slate-400 [&>.actions]:hover:w-12`}
      >
        {!disabled && (
          <button
            disabled={
              disabled ||
              (typeof props.min != 'undefined'
                ? fieldValue <= props.min
                : false)
            }
            onClick={handleDecrease}
            type="button"
            className={` origin-left ${inputStyles.buttons}`}
          >
            <MinusIcon className={` ${inputStyles.icons}`} />
          </button>
        )}
        <div className=" inline-flex w-full items-center justify-center px-3 disabled:opacity-25">
          {suffix && <span className={` ${inputStyles.unit}`}>{suffix}</span>}
          <input
            autoComplete="off"
            role={'custom-number'}
            disabled={disabled}
            aria-invalid={!!error ? 'true' : 'false'}
            type="number"
            className={`${
              !!error ? 'border-errorRed' : 'border-gray-200   '
            }  ${inputStyles.input}  `}
            {...props}
            {...field}
            onChange={handleOnChange}
            ref={(element) => {
              setInputElement(element);
              return field.ref(element);
            }}
            onFocus={({ target }) => target.select()}
          />
          {prefix && <small className={` ${inputStyles.unit}`}>{prefix}</small>}
        </div>
        {!disabled && (
          <button
            disabled={disabled || (props.max ? fieldValue >= props.max : false)}
            onClick={handleIncrease}
            type="button"
            className={` origin-right ${inputStyles.buttons}`}
          >
            <PlusIcon className={` ${inputStyles.icons}`} />
          </button>
        )}
      </div>

      {error && (
        <small className={` ${inputStyles.error}`}>{error.message}</small>
      )}
    </div>
  );
};

export default NumberFieldInput;

const inputStyles = {
  container: 'flex flex-col items-start gap-y-2',
  label: 'font-Secondary uppercase text-gray-500 px-1 dark:text-gray-400',
  input: '  focus:outline-none  bg-transparent flex-auto text-center  w-full ',
  error:
    ' bg-red-500/10 dark:bg-red-500/90 rounded-md px-4 py-1 text-darkBlue text-opacity-70 ',
  buttons:
    ' actions shrink-0 transition-all duration-200 w-0 h-full flex-initial flex items-center disabled:hover:bg-gray-200 dark:disabled:hover:bg-rose-200 justify-center hover:bg-gray-300 dark:hover:bg-rose-500 hover:text-white ',
  icons: ' w-6 h-6',
  unit: 'text-gray-500 flex-initial dark:text-gray-400'
};
