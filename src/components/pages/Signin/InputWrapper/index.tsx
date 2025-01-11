"use client"

import React, { useState } from 'react'
import styles from './index.module.css'
import { Button, Input, Alert } from 'antd'
import { handleSignIn } from '@/actions/firebase/auth'
import { useRouter } from 'next/navigation'

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState<"info" | "error" | "success" | "warning" | undefined>('info')
    const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setAlertMessage('')
    setLoading(true);
    const res = await handleSignIn({ email, password })

    if (res?.success) {
      setLoading(false)
      setAlertMessage('Logged in successfully')
      setAlertType('success')
      router.push('/dashboard')
    } else {
        setLoading(false)
      setAlertMessage(res?.error || 'Something went wrong')
        setAlertType('error')
    }
  }

  return (
    <div className={styles.inputWrapper}>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <Input 
        placeholder='Email' 
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder='Password' 
        value={password} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
      />
      <Button
        color='primary'
        variant='solid'
        onClick={handleSubmit}
        loading={loading}
      >
        Log in
      </Button>
    </div>
  )
}
