import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  autoComplete?: string | undefined;
  inputStyle?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}

const TextAreaInput: React.FC<Props> = ({ inputStyle, ...props }) => {
  const {
    fieldState: { error },
    field
  } = useController({
    ...props
  });
  return (
    <label className={` ${inputStyles.container}`}>
      {props.label && (
        <small className={` ${inputStyles.label}`}>{props.label}</small>
      )}
      <textarea
        aria-invalid={!!error ? 'true' : 'false'}
        className={` resize-none ${inputStyle} ${
          !!error ? 'border-errorRed' : 'border-gray-200'
        }  ${inputStyles.input}  `}
        {...props}
        {...field}
        rows={props.rows ?? 3}
      />
      {error && (
        <small className={` ${inputStyles.error}`}>{error.message}</small>
      )}
    </label>
  );
};

export default TextAreaInput;

const inputStyles = {
  container: 'flex flex-col gap-y-2 h-full ',
  label: 'font-Secondary uppercase text-gray-500 px-1',
  input:
    'rounded-md border  h-full bg-gray-100 py-2 px-4  transition-all duration-200 focus:outline-none focus:bg-white hover:bg-gray-50',
  error: ' bg-errorRed/10 rounded-md px-4 py-1 text-darkBlue text-opacity-70'
};
