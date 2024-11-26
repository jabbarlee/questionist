import React from 'react';
import styles from './index.module.css'
import Typography from "@mui/material/Typography";
import Link from 'next/link'

export default function Index() {
    return (
        <div className={styles.explanationWrapper}>
            <Typography className={styles.explanationText}>
                Get the most out of your study sessions, with unlimited practice sets, real-time feedback and more!
            </Typography>
            <Link href={'/explore'} className={styles.plansLink}>
                Explore plans
            </Link>
        </div>
    );
}
