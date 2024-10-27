import React, { useState } from 'react'
import Heading from '@/components/pages/Practice/Heading'
import styles from './index.module.css'
import ToggleButtonWrapper from '@/components/pages/Practice/ToggleButtonsWrapper'
import TopicsWrapper from '../_topics/TopicsWrapper'

export default function index() {
  return (
    <div className={styles.practicePage}> 
      <Heading/>
      <ToggleButtonWrapper/>
      <TopicsWrapper/>
    </div>
  )
}
