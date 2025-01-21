import React from 'react'
import Typography from '@mui/material/Typography'
import { Button } from 'antd'
import styles from './index.module.css'

export default async function MessageContainer () {
    return (
        <div className={styles.container}>
            <div className={styles.textWrapper}>
                <Typography className={styles.heading} fontSize={'28px'}>Welcome back, Amil 👋</Typography>
                <Typography className={styles.subheading} fontSize={'20px'}>Ready to ace your practice today?</Typography>
            </div>
            <Button
                size="large"
                type="primary"
                href="/practice/create"
                style={{ textDecoration: 'none', width: '100%' }}
            >
                Start practicing
            </Button>
        </div>
    )
}