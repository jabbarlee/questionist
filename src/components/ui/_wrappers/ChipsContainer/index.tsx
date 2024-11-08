import React from 'react'
import styles from './index.module.css'

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.chipsContainer}>
        {children}
    </div>
  )
}
