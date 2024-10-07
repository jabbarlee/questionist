import React from 'react'
import LoginForm from '@/components/pages/Signin/LoginForm'
import styles from './index.module.css'
import Image from '@/components/pages/Signin/Image'

export default function index() {
  return (
    <div className={styles.container}>
      <LoginForm className={styles.form}/>
      <Image className={styles.image}/>
    </div>
  )
}
