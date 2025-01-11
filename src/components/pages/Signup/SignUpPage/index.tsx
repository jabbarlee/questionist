import React from 'react'
import styles from './index.module.css'
import Image from '@/components/pages/Signin/Image'
import SignUpForm from '@/components/pages/Signup/SignUpForm'
import '../../../../app/(web)/globals.css';

export default function index() {
  return (
      <div className={styles.pageWrapper}>
          <div className={styles.container}>
              <SignUpForm className={styles.formSide}/>
              <div className={styles.imageSide}>
                  <Image/>
              </div>
          </div>
      </div>
  )
}
