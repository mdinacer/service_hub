import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import { useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchProfileAsync } from 'store/slices/profileSlice';

export default function useMemberProfile() {
  const dispatch = useAppDispatch();

  const { profile, profileLoaded, status } = useAppSelector(
    (state) => state.profile
  );
  const profileLoading = useMemo(() => status === 'pending', [status]);

  useEffect(() => {
    if (!profileLoaded && status !== 'pending') {
      dispatch(fetchProfileAsync());
    }
  }, [dispatch, profileLoaded, status]);

  return {
    profile,
    profileLoading,
    profileLoaded
  };
}
