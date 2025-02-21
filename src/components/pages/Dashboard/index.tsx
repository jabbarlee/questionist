import React from 'react'
import styles from './index.module.css'
import ScoreChart from '@/components/ui/Dashboard/ScoreChart'
import MessageContainer from '@/components/ui/Dashboard/MessageContainer'
import Typography from "@mui/material/Typography";
import { TrendingContract } from '@/components/ui/Dashboard/TrendingContract';

export default function Dashboard() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.leftContainer}>
                <div className={styles.messageContainer}>
                    <MessageContainer/>
                </div>
                <div className={styles.trendingContractContainer}>
                    <TrendingContract/>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <Typography className={styles.heading} fontSize={'22px'}>Scores</Typography>
                <ScoreChart/>
            </div>
        </div>
    )
}