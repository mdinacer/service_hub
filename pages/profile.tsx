import useMemberProfile from 'hooks/useMemberProfile';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileForm from '@components/forms/profile/ProfileForm';
import Layout from '@components/Layout';
import Modal from '@components/modals/Modal';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import useCategories from 'hooks/useCategories';

const Profile: NextPage = withPageAuthRequired(() => {
  const { categories } = useCategories();
  const { profile } = useMemberProfile();
  const [editModalVisible, setEditModalVisible] = useState(false);

  if (!profile) {
    return <div>no profile</div>;
  }
  return (
    <>
      <Layout
        title={`${profile?.displayName ?? 'User'} Profile`}
        description={''}
        className=" container mx-auto flex-1 p-5"
      >
        <div className=" flex h-full flex-row items-stretch ">
          <div className="relative flex w-[35vw] flex-initial flex-col items-center gap-4 rounded-md bg-slate-600 p-8">
            <div className=" relative mx-auto h-48 w-48  overflow-hidden rounded-full">
              {profile?.picture && (
                <Image
                  fill
                  src={profile.picture.url}
                  alt={profile.displayName}
                  className=" aspect-square h-full w-full"
                />
              )}
            </div>
            <p className=" text-3xl capitalize">{profile?.displayName}</p>
            <div className="">
              <p className=" whitespace-pre-line text-sm text-slate-300">
                {profile?.description}
              </p>
            </div>

            <div className=" absolute top-0 right-0">
              <button
                onClick={() => setEditModalVisible(true)}
                className="p-4  text-slate-300 hover:text-white"
              >
                <PencilSquareIcon className=" h-6 w-6" />
              </button>
            </div>
          </div>
          <div className=" w-full flex-auto"></div>
        </div>
      </Layout>

      <Modal
        visible={!!profile && editModalVisible}
        onClose={() => setEditModalVisible(false)}
      >
        <ProfileForm
          profile={profile}
          onClose={() => setEditModalVisible(false)}
        />
      </Modal>
    </>
  );
});

export default Profile;
