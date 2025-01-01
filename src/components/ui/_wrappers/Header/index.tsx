"use client"

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Dropdown } from 'antd'
import { MenuProps } from 'antd/lib/menu'
import { getUser } from '@/actions/firebase/getDoc'
import { useRouter } from "next/navigation"
import { Button } from "antd"
import Link from "next/link"

export default function ({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        getUser().then((data) => {
            setUser(data?.email);
        });
    }, []);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push('/settings');
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <div>
                    <Link
                        href={"/settings"}
                        className={styles.link}
                    >
                        Settings
                    </Link>
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div>
                    <Link
                        href={"/logout"}
                        className={styles.link}
                    >
                        Logout
                    </Link>
                </div>
            ),
            key: '2',
        },
    ];

    return (
        <div className={styles.header}>
            <div>
                <p className={styles.headerText}>{children}</p>
            </div>
            <div>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button>{user ? user : 'Loading...'}</Button>
                </Dropdown>
            </div>
        </div>
    )
}