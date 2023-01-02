import { MemberProfile } from 'models/member-profile';
import React, { useCallback, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldInput from '../inputs/TextFieldInput';
import agent from 'services/agent';
import { useAppDispatch } from 'store/configureStore';
import { setProfile } from 'store/slices/profileSlice';

interface Props {
  profile: MemberProfile;
  onClose: () => void;
}

const AccountForm: React.FC<Props> = ({ profile, onClose }) => {
  const dispatch = useAppDispatch();
  const methods = useForm<FieldValues, any>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { control, handleSubmit, reset } = methods;

  const loadProfileValues = useCallback(() => {
    if (!profile) return;
    const { displayName, firstName, lastName, email, phone } = profile;
    reset({
      displayName: displayName ?? '',
      email: email ?? '',
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      phone: phone ?? ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    loadProfileValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmitData(values: FieldValues) {
    try {
      const result = await agent.Account.update(values);
      dispatch(setProfile(result));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className="flex w-full max-w-lg flex-col items-stretch gap-4"
    >
      <TextFieldInput
        autoComplete="first name"
        control={control}
        name={'firstName'}
        label="First Name"
      />
      <TextFieldInput
        autoComplete="last name"
        control={control}
        name={'lastName'}
        label="Last Name"
      />
      <TextFieldInput
        autoComplete="email"
        control={control}
        name={'email'}
        label="Email"
      />
      <TextFieldInput
        autoComplete="phone"
        control={control}
        name={'phone'}
        label="Phone Number"
      />

      <div className=" mt-4 flex w-full flex-row items-center justify-between">
        <button
          onClick={onClose}
          type="button"
          className=" rounded border border-black py-2  px-4"
        >
          Cancel
        </button>
        <button
          type="submit"
          className=" rounded bg-teal-500 py-2 px-4 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AccountForm;

const defaultValues: FormDataType = {
  email: '',
  firstName: '',
  lastName: '',
  phone: ''
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required()
});

interface FormDataType {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
