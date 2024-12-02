'use client';

import React, { useState } from 'react';
import styles from './index.module.css';
import NavbarLink from '../NavbarLink';
import { Button } from 'antd'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbar}>
      {isOpen ? (
        null
      ) : (
        <div className={styles.logo}>Logo</div>
      )}

      <div className={`${styles.links}`}>
        <div className={`${isOpen ? styles.showLinks : styles.hideLinks}`}>
          <div className={styles.linksWrapper}>
            <NavbarLink redirect='/'>Landing page</NavbarLink>
            <NavbarLink redirect='/'>Explore</NavbarLink>
            <NavbarLink redirect='/'>Pricing</NavbarLink>
            <NavbarLink redirect='/'>Contact</NavbarLink>
          </div>
          <Button variant='outlined' color={'default'} href={'/signin'}>Sign in</Button>
          <Button variant='solid' color={'default'} href={'/signin'}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}
