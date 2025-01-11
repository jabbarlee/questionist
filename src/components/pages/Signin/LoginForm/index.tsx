import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import styles from './index.module.css'
import { Typography } from '@mui/material'
import Link from "next/link";

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.loginForm}>
        <Typography fontSize={'24px'}>
          Welcome back 👋
        </Typography>
        <InputWrapper />
        <Link href={'/'} style={{ textDecoration: 'none', color: '#757575' }}>Forgot password?</Link>
        <Link href={'/signup'} style={{ textDecoration: 'none', color: '#757575' }}>Create an account!</Link>
      </div>
    </div>
  )
}
