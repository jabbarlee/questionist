import React, { useState } from 'react'
import Heading from '@/components/pages/Practice/Heading'
import styles from './index.module.css'
import ConfigWrapper from '../ConfigWrapper'

export default function index() {
  return (
    <div className={styles.practicePage}> 
      {/* <Heading/> */}
      <ConfigWrapper/>
    </div>
  )
}
