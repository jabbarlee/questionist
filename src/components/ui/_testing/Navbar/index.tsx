import React from 'react';
import styles from './index.module.css';
import NavbarLink from '@/components/ui/NavbarLink';
import { Typography } from '@mui/material';
import { Divider } from "antd";

export default function Index() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                <div className={styles.profile}>
                    <p className={styles.logo}>Logo</p>
                </div>
                <div>
                    <Typography className={styles.navLink}>Dashboard</Typography>
                    <Typography className={styles.navLink}>Practice</Typography>
                    <Typography className={styles.navLink}>Results</Typography>
                    <Typography className={styles.navLink}>Settings</Typography>
                </div>
            </div>
            <div className={styles.footer}>
                <p>Logout</p>
            </div>
        </nav>
    );
}
