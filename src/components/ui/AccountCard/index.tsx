import React from 'react'
import styles from './index.module.css'
import {Typography} from "@mui/material"
import { ScoreProgress } from "@/components/ui/Results/Session/ScoreBoard/ScoreChip"
import { Bolt } from "@/data/icons/practice"

export function AccountCard() {
    return (
        <div className={styles.container}>
            <div className={styles.accountInfoWrapper}>
                <div className={styles.accountInfo}>
                    <div className={styles.fullName}>
                        <Typography className={styles.fullNameText}>Amil Jabbarli</Typography>
                    </div>
                </div>
                <div className={styles.levelNum}>
                    <Typography className={styles.levelNumText}>Level 3</Typography>
                </div>
            </div>
            <div className={styles.progressInfo}>
                <div className={styles.progressBar}>
                    <ScoreProgress progress={70}/>
                </div>
            </div>
        </div>
    )
}
