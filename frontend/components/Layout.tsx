import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
