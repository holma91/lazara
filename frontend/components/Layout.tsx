import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
