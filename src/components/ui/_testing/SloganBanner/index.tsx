import React from 'react';
import styles from './index.module.css'
import Typography from "@mui/material/Typography";
import Link from 'next/link'

export default function Index() {
    return (
        <div className={styles.explanationWrapper}>
            <Typography className={styles.explanationText}>
                Start your journey with a custom set of questions.
            </Typography>
            <Typography className={styles.explanationText}>
                Understand your mistakes, and elevate!
            </Typography>
        </div>
    );
}
