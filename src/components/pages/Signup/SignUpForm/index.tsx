import React from 'react'
import styles from './index.module.css'
import { Typography } from '@mui/material'
import InputWrapper from '@/components/pages/Signup/InputWrapper'
import Link from 'next/link'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.signupForm}>
        <Typography fontSize={'24px'}>
          Create an account
        </Typography>
        <InputWrapper />
        <Link href={'/signin'} style={{ textDecoration: 'none', color: '#757575' }}>Already have an account?</Link>
      </div>
    </div>
  )
}
