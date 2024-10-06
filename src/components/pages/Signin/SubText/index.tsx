import React from 'react'
import styles from './index.module.css'
import Link from 'next/link'

export default function index() {
  return (
    <div className={styles.subTextWrapper}>
        <Link className={styles.link} href='/'>Forgot password?</Link>
        <Link className={styles.link} href='/'>Create a new account</Link>
    </div>
  )
}
