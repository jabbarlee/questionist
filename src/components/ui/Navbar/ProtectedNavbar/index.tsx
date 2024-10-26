import React from 'react'
import styles from './index.module.css'
import NavbarLink from '@/components/ui/NavbarLink';
import Text from '@/components/ui/Text';

export default function index() {
  return (
    <div className={styles.navbar}>
        <div>
            Logo
        </div>
        <div className={styles.linksWrapper}>
            <Text subheading={true}>Home</Text>
            <NavbarLink redirect='/'>Dashboard</NavbarLink>
            <NavbarLink redirect='/'>Practice</NavbarLink>
            <NavbarLink redirect='/'>My Results</NavbarLink>
            <Text subheading={true}>Settings</Text>
            <NavbarLink redirect='/'>Profile</NavbarLink>
            <NavbarLink redirect='/'>Plans</NavbarLink>
        </div>
        <div>
            <NavbarLink underline={true} redirect='/'>Logout</NavbarLink>
        </div>
    </div>
  )
}
