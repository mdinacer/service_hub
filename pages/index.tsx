import { useState } from 'react';
import useMemberProfile from 'hooks/useMemberProfile';

import AccountForm from '@components/forms/account/AccountForm';
import Layout from '@components/Layout';
import Modal from '@components/modals/Modal';

import type { NextPage } from 'next';
import useInitApp from 'hooks/useInitApp';
const Home: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  useInitApp();

  return (
    <Layout
      title={''}
      description={''}
      className="container mx-auto flex flex-col items-stretch p-5 lg:justify-center"
    >
      {/* <div>test</div>
      <a href={'/api/auth/login'}>Login</a>
      <a href={'/api/auth/logout'}>Logout</a> */}
      <a href={'/api/auth/login'}>Login</a>
      {/* <Modal
        visible={!!profile && modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <AccountForm profile={profile} onClose={() => setModalVisible(false)} />
      </Modal> */}
    </Layout>
  );
};

export default Home;
