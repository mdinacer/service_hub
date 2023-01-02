import React from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label?: string;
  decimalsLimit?: number;
  step?: number;
}

const options: ReadonlyArray<CurrencyInputProps['intlConfig']> = [
  {
    locale: 'de-DE',
    currency: 'EUR'
  },
  {
    locale: 'en-US',
    currency: 'USD'
  },
  {
    locale: 'en-GB',
    currency: 'GBP'
  },
  {
    locale: 'ja-JP',
    currency: 'JPY'
  },
  {
    locale: 'en-IN',
    currency: 'INR'
  }
];

const CurrencyFieldInput: React.FC<Props> = ({
  label,
  step = 1,
  decimalsLimit = 2,
  ...props
}) => {
  const {
    fieldState: { error },
    field: { value, onBlur, onChange }
  } = useController({
    ...props
  });

  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (
    value,
    _,
    values
  ): void => {
    if (values) {
      const { float } = values;
      onChange(float ?? 0);
    }
  };

  return (
    <label className={` ${inputStyles.container}`}>
      {label && <small className={` ${inputStyles.label}`}>{label}</small>}
      <CurrencyInput
        intlConfig={options[1]}
        onBlur={onBlur}
        value={value}
        decimalsLimit={decimalsLimit}
        min={0}
        step={step}
        {...props}
        onValueChange={handleOnValueChange}
        className={` selection:bg-green/40 ${
          !!error ? 'border-errorRed' : 'border-gray-200'
        }  ${inputStyles.input}  `}
        onFocus={({ target }) => target.select()}
      />

      {error ? (
        <small className={` ${inputStyles.error}`}>{error.message}</small>
      ) : (
        <small className=" text-xs text-gray-700 dark:text-slate-400">
          Shortcuts: K = x1,000, M = x1,000,000, B = x1,000,000,000
        </small>
      )}
    </label>
  );
};

export default CurrencyFieldInput;

const inputStyles = {
  container: 'flex flex-col gap-y-2 ',
  label: 'font-Secondary uppercase text-gray-500 px-1 dark:text-gray-400',
  input:
    'dark:bg-slate-600 dark:border-slate-800 dark:hover:bg-slate-500 dark:focus:bg-slate-500 rounded-md border text-center  bg-gray-100 py-2 px-4 transition-all duration-200 focus:outline-none focus:bg-white hover:bg-gray-50',
  error:
    ' bg-red-500/10 dark:bg-red-500/40 rounded-md px-4 py-1 text-darkBlue text-opacity-70'
};
