'use client';

import React, { useState } from 'react';
import styles from './index.module.css';
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
            <Button
                href='/'
                variant={'text'}
                color={'default'}
                style={{ textDecoration: 'none' }}
            >
              Home
            </Button>
            <Button
                href='/'
                variant={'text'}
                color={'default'}
                style={{ textDecoration: 'none' }}
            >
              Explore
            </Button>
            <Button
                href='/'
                variant={'text'}
                color={'default'}
                style={{ textDecoration: 'none' }}
            >
              Pricing
            </Button>
            <Button
                href='/'
                variant={'text'}
                color={'default'}
                style={{ textDecoration: 'none' }}
            >
              Contact
            </Button>
          </div>
          <Button variant='outlined' color={'default'} href={'/signin'} style={{ textDecoration: 'none' }}>Sign in</Button>
          <Button variant='solid' color={'default'} href={'/signup'} style={{ textDecoration: 'none' }}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}
