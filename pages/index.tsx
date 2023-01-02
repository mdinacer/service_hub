import useInitApp from 'hooks/useInitApp';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import ServiceForm from '@components/forms/services/ServiceForm';
import Layout from '@components/Layout';
import Modal from '@components/modals/Modal';
import AppStepper from '@components/stepper/AppStepper';

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

      <AppStepper />

      <Modal
        className=" "
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <ServiceForm onClose={() => setModalVisible(false)} />
        {/* <AppStepper /> */}
      </Modal>
    </Layout>
  );
};

export default Home;
