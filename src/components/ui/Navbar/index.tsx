import React from 'react'
import styles from './index.module.css'
import Link from 'next/link'

export default function index() {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.links}>
            <div className={styles.linksWrapper}>
                <Link href='/'>Landing page</Link>
                <Link href='/'>Explore</Link>
                <Link href='/'>Pricing</Link>
                <Link href='/'>Contact</Link>
            </div>
            <div className={styles.authButtons}>
                <Link className={styles.signInButton} href='/'>Sign in</Link>
                <Link className={styles.registerButton} href='/'>Register</Link>
            </div>
        </div>
    </div>
  )
}
