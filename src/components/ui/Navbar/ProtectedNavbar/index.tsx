import React from 'react'
import styles from './index.module.css'
import ProtectedNavbarLink from '@/components/ui/NavbarLink/ProtectedNavbarLink';
import Text from '@/components/ui/Text';

export default function index() {
  return (
    <div className={styles.navbar}>
        <div>
            Logo
        </div>
        <div className={styles.linksWrapper}>
          {/* <Text subheading={true}>Home</Text> */}
          <ProtectedNavbarLink redirect='/'>Dashboard</ProtectedNavbarLink>
          <ProtectedNavbarLink redirect='/practice'>Practice</ProtectedNavbarLink>
          <ProtectedNavbarLink redirect='/'>My Results</ProtectedNavbarLink>
          {/* <Text subheading={true}>Settings</Text> */}
          <ProtectedNavbarLink redirect='/'>Profile</ProtectedNavbarLink>
          <ProtectedNavbarLink redirect='/'>Plans</ProtectedNavbarLink>
        </div>
        <div>
          <ProtectedNavbarLink underline={true} redirect='/'>Logout</ProtectedNavbarLink>
        </div>
    </div>
  )
}
