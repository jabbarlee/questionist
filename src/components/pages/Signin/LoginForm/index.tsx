import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import styles from './index.module.css'
import SubText from '@/components/pages/Signin/SubText'
import HeadingText from '@/components/pages/Signin/HeadingText'
import ProvidersWrapper from '@/components/pages/Signin/ProvidersWrapper'

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.loginForm}>
        <HeadingText />
        <InputWrapper />
        <SubText />
      </div>
    </div>
  )
}
