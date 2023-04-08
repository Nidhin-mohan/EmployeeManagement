// import React from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Employmanagement.module.scss';


interface NavbarProps {}

//interface NavbarState {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav>
     
     <Link to="/" className={styles.logoLink}>
  <h1 className={styles.logo}>HR Portal</h1>
</Link>
    </nav>
  );
};

export default Navbar;
