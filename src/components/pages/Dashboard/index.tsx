import React from 'react'
import styles from './index.module.css'
import ScoreChart from '@/components/ui/Dashboard/ScoreChart'
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.chart}>
                <Typography className={styles.heading} fontSize={'22px'}>Progress</Typography>
                <ScoreChart />
            </div>
        </div>
    )
}