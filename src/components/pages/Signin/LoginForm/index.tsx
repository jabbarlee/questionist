import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import Button from '@/components/ui/Button'
import styles from './index.module.css'

export default function index() {
  return (
    <div className={styles.loginForm}>
      <InputWrapper />
    </div>
  )
}
