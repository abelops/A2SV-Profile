import React from 'react'
import Link from 'next/link'
import { ReactNode } from 'react';
import { Providers } from '@/store/provider';
import { store } from '@/store';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <div>
          <div className='bg-slate-900 h-12 flex justify-center items-center text-white'>
            <div className='flex gap-6'>
              <Link href='/'> Home </Link>
              <Link href='/addpost'> Add post </Link>
            </div>
          </div>
          <div className='mx-10 my-10'>{children}</div>
      </div>
    </Providers>
  );
}

export default Layout