import React from 'react'
import styles from './index.module.css'
import Typography from "@mui/material/Typography";

export default function ({ children } : { children: React.ReactNode }) {
  return (
      <div className={styles.header}>
        <Typography className={styles.headerText}>
          {children}
        </Typography>
      </div>
  )
}
