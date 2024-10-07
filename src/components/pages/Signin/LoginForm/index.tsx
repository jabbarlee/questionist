import React from 'react'
import InputWrapper from '@/components/pages/Signin/InputWrapper'
import styles from './index.module.css'
import SubText from '@/components/pages/Signin/SubText'
import HeadingText from '@/components/pages/Signin/HeadingText'
import Image from '@/components/pages/Signin/Image'

export default function index() {
  return (
    <div className={styles.loginForm}>
      <HeadingText />
      <InputWrapper />
      <SubText />
    </div>
  )
}
