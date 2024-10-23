import React from 'react'
import styles from './index.module.css'
import HeadingText from '@/components/pages/Signup/HeadingText'
import InputWrapper from '@/components/pages/Signup/InputWrapper'
import SubText from '@/components/pages/Signup/SubText'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.signupForm}>
        <HeadingText />
        <InputWrapper />
        <SubText />
      </div>
    </div>
  )
}
