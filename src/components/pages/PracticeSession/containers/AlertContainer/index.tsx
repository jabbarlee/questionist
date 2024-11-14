import React from 'react'
import styles from './index.module.css'
import Alert from '@mui/material/Alert';

export default function index({ error, message }: { error: string | null, message: string | null }) {
  return (
    <div className={styles.alertContainer}>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
    </div>
  )
}
