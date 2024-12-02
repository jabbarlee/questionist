import React from 'react';
import styles from './index.module.css';
import NavbarHeader from '@/components/ui/Header/NavbarHeader';
import Link from '../Link'
import {
    HomeOutlined,
    FunctionOutlined,
    StockOutlined,
    SettingOutlined,
    StarOutlined
} from '@ant-design/icons';

export default function Index() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.sectionWrapper}>
                <NavbarHeader>
                    Questionist
                </NavbarHeader>
                <div className={styles.linksWrapper}>
                    <Link redirect={'/dashboard'}>
                        <HomeOutlined style={{ fontSize: '25px' }}/>
                        Home
                    </Link>
                    <Link redirect={'/practice'}>
                        <FunctionOutlined style={{ fontSize: '25px' }}/>
                        Practice
                    </Link>
                    <Link redirect={'/results'}>
                        <StockOutlined style={{ fontSize: '25px' }}/>
                        Results
                    </Link>
                    <Link redirect={'/plan'}>
                        <StarOutlined style={{ fontSize: '25px' }}/>
                        My Plan
                    </Link>
                    <Link redirect={'/settings'}>
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
