import  { ReactNode } from 'react';
import * as React from 'react';

import  Navbar  from './Navbar';

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div  className="background-color: black">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
