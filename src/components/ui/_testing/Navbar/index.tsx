import React from 'react';
import styles from './index.module.css';
import HeaderText from '../HeaderText';
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
                <HeaderText>
                    Questionist
                </HeaderText>
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
