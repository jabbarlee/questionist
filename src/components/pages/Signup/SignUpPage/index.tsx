import React from 'react'
import styles from './index.module.css'
import Image from '@/components/pages/Signin/Image'
import SignUpForm from '@/components/pages/Signup/SignUpForm'

export default function index() {
  return (
    <div className={styles.container}>
      <SignUpForm className={styles.formSide}/>
      <Image className={styles.imageSide}/>
    </div>
  )
}
