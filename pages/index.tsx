import type { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import useInitApp from '../hooks/useInitApp';

const Home: NextPage = () => {
  const { profile } = useInitApp();

  useEffect(() => {
    if (profile) {
      console.log(profile);
    }
  }, [profile]);

  return (
    <Layout title={''} description={''}>
      <div>test</div>
      <a href={'/api/auth/login'}>Login</a>
      <a href={'/api/auth/logout'}>Logout</a>
    </Layout>
  );
};

export default Home;
