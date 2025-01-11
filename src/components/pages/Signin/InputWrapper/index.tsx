"use client"

import React, { useState } from 'react'
import styles from './index.module.css'
import { Button, Input, Alert } from 'antd'
import { handleSignIn } from '@/actions/firebase/auth'
import { useRouter } from 'next/navigation'

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    const res = await handleSignIn({ email, password })

    if (res?.success) {
      router.push('/dashboard')
    } else {
      setError(res?.error || 'Something went wrong')
    }
  }

  return (
    <div className={styles.inputWrapper}>
      {error && <Alert message={error} type='error' />}
      <Input 
        placeholder='Email' 
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <Input 
        placeholder='Password' 
        value={password} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
