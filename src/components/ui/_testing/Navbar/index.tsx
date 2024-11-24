import React from 'react';
import styles from './index.module.css';
import NavbarLink from '@/components/ui/NavbarLink';
import { Typography } from '@mui/material';
import Link from './Link'
import {
    HomeOutlined,
    FunctionOutlined,
    StockOutlined,
    SettingOutlined
} from '@ant-design/icons';

export default function Index() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                <div className={styles.profile}>
                    <p className={styles.logo}>Logo</p>
                </div>
                <div className={styles.linksWrapper}>
                    <Link redirect={'/test/dashboard'}>
                        <HomeOutlined style={{ fontSize: '25px' }}/>
                        Home
                    </Link>
                    <Link redirect={'/test/practice'}>
                        <FunctionOutlined style={{ fontSize: '25px' }}/>
                        Practice
                    </Link>
                    <Link redirect={'/test/results'}>
                        <StockOutlined style={{ fontSize: '25px' }}/>
                        Results
                    </Link>
                    <Link redirect={'/test/settings'}>
                        <SettingOutlined style={{ fontSize: '25px' }}/>
                        Settings
                    </Link>
                </div>
            </div>
            <div className={styles.footer}>
                <Link redirect={'/'} underline={true}>Logout</Link>
            </div>
        </nav>
    );
}
