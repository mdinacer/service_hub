import { yupResolver } from '@hookform/resolvers/yup';
import { MemberProfile } from 'models/member-profile';
import React, { useCallback, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

import ImageDropZone from '@components/dropZone/ImageDropZone';
import Image from 'next/image';
import TextAreaInput from '../inputs/TextAreaInput';
import TextFieldInput from '../inputs/TextFieldInput';
import { uploadAssetAsync } from 'services/assetsService';
import agent from 'services/agent';
import { useAppDispatch } from 'store/configureStore';
import { setProfile } from 'store/slices/profileSlice';

interface Props {
  profile: MemberProfile;
  onClose: () => void;
}

const ProfileForm: React.FC<Props> = ({ profile, onClose }) => {
  const dispatch = useAppDispatch();
  const methods = useForm<FieldValues, any>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isSubmitting, isValid }
  } = methods;

  const { file } = watch();

  const loadProfileValues = useCallback(() => {
    if (!profile) return;
    const { displayName, description } = profile;
    reset({
      displayName: displayName ?? '',
      description: description ?? ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    loadProfileValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmitData(data: FieldValues) {
    try {
      const { file, ...values } = data;

      if (file) {
        if (profile.picture?.id) {
          await agent.Assets.delete(profile.picture.id);
        }
        const uploadResult = await uploadAssetAsync(file);
        values.assetId = uploadResult.id;
      }

      const result = await agent.Account.update(values);
      dispatch(setProfile(result));
      onClose();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className="flex w-full max-w-lg flex-col items-stretch gap-4"
    >
      <div className="relative aspect-square  w-full shrink-0 overflow-hidden rounded bg-gray-100">
        {file?.preview ? (
          <div>
            <Image
              fill
              className="h-full w-full object-cover object-center"
              src={file.preview}
              alt="preview"
            />
          </div>
        ) : (
          <ImageDropZone control={control} name="file" />
        )}
      </div>
      <TextFieldInput
        autoComplete="display name"
        control={control}
        name={'displayName'}
        label="Display Name"
      />

      <TextAreaInput
        label="Short Bio"
        rows={6}
        control={control}
        name={'description'}
      />

      <div className=" mt-4 flex w-full flex-row items-center justify-between">
        <button
          onClick={onClose}
          type="button"
          className=" rounded border border-black py-2  px-4"
        >
          {isDirty ? 'Cancel' : 'Close'}
        </button>
        <button
          disabled={!isValid || !isDirty || isSubmitting}
          aria-disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          className=" rounded bg-teal-500 py-2 px-4 text-white disabled:opacity-25"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

const defaultValues: FormDataType = {
  displayName: '',
  file: null
};

const validationSchema = yup.object().shape({
  displayName: yup.string().required()
});

interface FormDataType {
  displayName: string;
  file: File | null;
}
