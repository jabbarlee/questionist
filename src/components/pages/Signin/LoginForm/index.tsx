import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import styles from './index.module.css'
import { Typography } from '@mui/material'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.loginForm}>
        <Typography fontSize={'24px'}>
          Welcome back 👋
        </Typography>
        <InputWrapper />
        <Typography>Forgot password?</Typography>
        <Typography>Create a new account</Typography>
      </div>
    </div>
  )
}
