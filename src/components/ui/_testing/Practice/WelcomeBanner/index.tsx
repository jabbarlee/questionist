import React from 'react';
import styles from './index.module.css'
import Typography from "@mui/material/Typography";
import Link from 'next/link'

export default function Index({
    fullName,
    email
}: {
    fullName: string,
    email: string
}) {
    return (
        <div className={styles.welcomeWrapper}>
            <div className={styles.welcomeTextWrapper}>
                <Typography className={styles.welcomeText}>Welcome back {fullName}</Typography>
                <Typography className={styles.welcomeSubText}>{email}</Typography>
            </div>
            <div className={styles.editButtonWrapper}>
                <Link href='/settings' className={styles.editButton}>Edit</Link>
            </div>
        </div>
    );
}
