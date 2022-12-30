import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { fetchProfileAsync } from 'store/slices/profileSlice';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useMemo } from 'react';

export default function useInitApp() {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const {
    profile,
    profileLoaded,
    status: profileStatus
  } = useAppSelector((state) => state.profile);
  const profileLoading = useMemo(
    () => profileStatus === 'pending',
    [profileStatus]
  );

  useEffect(() => {
    if (user && !profileLoaded && profileStatus !== 'pending') {
      dispatch(fetchProfileAsync());
    }
  }, [dispatch, profileLoaded, profileStatus, user]);

  return {
    profile,
    profileLoading,
    profileLoaded
  };
}
