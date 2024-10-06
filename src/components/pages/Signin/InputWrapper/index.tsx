import React from 'react'
import Input from '@/components/ui/Input'
import styles from './index.module.css'
import Button from '@/components/ui/Button'

export default function index() {
  return (
    <div className={styles.inputWrapper}>
        <Input placeholder='Email'/>
        <Input placeholder='Password'/>
        <Button buttonType='secondary' fit={true}>Sign in</Button>
    </div>
  )
}
