import { NextSeo } from 'next-seo';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const Layout = ({
  children,
  className,
  description,
  title
}: Props): JSX.Element => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <main className="relative flex min-h-screen select-none flex-col items-stretch bg-white text-slate-900 dark:bg-slate-800 dark:text-white">
        <ToastContainer theme="colored" position="bottom-right" />
        <div className={`flex-1 ${className ?? ' container mx-auto px-5'}`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
