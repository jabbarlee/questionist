'use client';

import React, { useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import Button from '../Button';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the hamburger menu
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
            <Link className={styles.link} href='/'>Landing page</Link>
            <Link href='/'>Explore</Link>
            <Link href='/'>Pricing</Link>
            <Link href='/'>Contact</Link>
          </div>
          

          {/* <div className={styles.authButtons}> */}
            <Button buttonType='secondary' redirect='/'>Sign in</Button>
            <Button buttonType='primary' redirect='/'>Register</Button>
          {/* </div> */}
        </div>

        <Button onClick={toggleMenu} buttonType='primary' className={styles.hamburger}>☰</Button>
      </div>
    </div>
  );
}
