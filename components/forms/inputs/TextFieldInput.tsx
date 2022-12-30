import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
}

const TextFieldInput: React.FC<Props> = (props) => {
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
      <input
        aria-invalid={!!error ? 'true' : 'false'}
        type="text"
        className={` selection:bg-green/40 ${
          !!error ? 'border-errorRed' : 'border-gray-200'
        }  ${inputStyles.input}  `}
        onFocus={({ target }) => target.select()}
        {...props}
        {...field}
      />
      {error && (
        <small className={` ${inputStyles.error}`}>{error.message}</small>
      )}
    </label>
  );
};

export default TextFieldInput;

const inputStyles = {
  container: 'flex flex-col gap-y-2 ',
  label: 'font-Secondary uppercase text-gray-500 px-1',
  input:
    'rounded-md border   bg-gray-100 py-2 px-4 transition-all duration-200 focus:outline-none focus:bg-white hover:bg-gray-50',
  error: ' bg-errorRed/10 rounded-md px-4 py-1 text-darkBlue text-opacity-70'
};
