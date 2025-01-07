"use client"

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import {Typography} from "@mui/material"
import { LevelProgress } from './LevelProgress'
import { getUser } from '@/actions/firebase/get/getUser'
import { UserData } from '@/types'
import Link from 'next/link'

export function AccountCard() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUser();
            setUserData(response);
        };

        fetchUserData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.accountInfoWrapper}>
                <div className={styles.accountInfo}>
                    <div className={styles.fullName}>
                        <Typography className={styles.fullNameText}>
                            <Link href={'/account'} style={{ textDecoration: 'none', color: 'inherit' }}>{userData?.name}</Link>
                        </Typography>
                    </div>
                </div>
                <div className={styles.levelNum}>
                    <Typography className={styles.levelNumText}>Level {userData?.level}</Typography>
                </div>
            </div>
            <div className={styles.progressInfo}>
                <div className={styles.progressBar}>
                    <LevelProgress
                        axpToNextLevel={userData?.axpToNextLevel || 0}
                        currentAxp={userData?.axp || 0}
                    />
                </div>
            </div>
        </div>
    )
}
