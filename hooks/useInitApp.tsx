import { useUser } from '@auth0/nextjs-auth0/client';
import { useCallback, useEffect, useState } from 'react';
import { MemberProfile } from '../models/member-profile';
import agent from '../services/agent';

export default function useInitApp() {
  const { user } = useUser();
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await agent.Account.me();

      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return {
    profile
  };
}
