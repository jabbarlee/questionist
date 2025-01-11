import React from 'react'
import LoginForm from '@/components/pages/Signin/LoginForm'
import styles from './index.module.css'
import Image from '@/components/pages/Signin/Image'
import '../../../../app/(web)/globals.css';

export default function index() {
  return (
      <div className={styles.pageWrapper}>
          <div className={styles.container}>
              <LoginForm className={styles.formSide}/>
              <div className={styles.imageSide}>
                  <Image/>
              </div>
          </div>
      </div>
  )
}
