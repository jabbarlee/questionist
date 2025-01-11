import React from 'react'
import styles from './index.module.css'
import { Typography } from '@mui/material'
import InputWrapper from '@/components/pages/Signup/InputWrapper'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.signupForm}>
        <Typography fontSize={'24px'}>
          Sign up
        </Typography>
        <InputWrapper />
        <Typography>Already have an account?</Typography>
      </div>
    </div>
  )
}
