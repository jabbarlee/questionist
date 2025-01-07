"use client"

import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import {Typography} from "@mui/material"
import { LevelProgress } from './LevelProgress'
import { getUser } from '@/actions/firebase/get/getUser'
import { UserData } from '@/types'

export function AccountCard() {
    const [userData, setUserData] = React.useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUser();
            setUserData(response);
        };

        fetchUserData();
    }, []);

    const progress = userData && userData.axp && userData.axpToNextLevel
        ? (userData.axp / userData.axpToNextLevel) * 100
        : 0;

    return (
        <div className={styles.container}>
            <div className={styles.accountInfoWrapper}>
                <div className={styles.accountInfo}>
                    <div className={styles.fullName}>
                        <Typography className={styles.fullNameText}>{userData?.name}</Typography>
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
                        progress={progress}
                    />
                </div>
            </div>
        </div>
    )
}
