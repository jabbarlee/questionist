import React from 'react'
import Input from '@/components/ui/Input'
import styles from './index.module.css'

export default function index() {
  return (
    <div className={styles.inputWrapper}>
        <Input placeholder='Email'/>
        <Input placeholder='Password'/>
    </div>
  )
}
