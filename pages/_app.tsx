import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { UserProvider } from '@auth0/nextjs-auth0/client';

// import { store } from '../stores/configureStore';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  const url = `https://creator.vulkaza.com`;

  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" type="image/png" />
      </Head>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico'
          },
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '76x76'
          },
          {
            rel: 'manifest',
            href: '/site.webmanifest'
          }
        ]}
        titleTemplate="%s - ServiceHub"
        defaultTitle="Service Hub"
        openGraph={{
          type: 'website',
          locale: 'en_Us',
          url,
          description: `.`,
          site_name: 'Service Hub',
          images: [
            {
              url: '/preview.webp',
              width: 800,
              height: 420,
              alt: 'Og Image Alt'
            }
          ]
        }}
        twitter={{
          handle: '@mataktak',
          site: '@mtaktak',
          cardType: 'summary_large_image'
        }}
        canonical={url}
      />

      <UserProvider>
        {/* <Provider store={store}> */}
        {/* <Component {...pageProps} canonical={url} key={url} /> */}
        {/* </Provider> */}
        <Component {...pageProps} canonical={url} key={url} />
      </UserProvider>
    </>
  );
}

export default MyApp;
