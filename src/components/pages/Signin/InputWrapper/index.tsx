"use client"

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import styles from './index.module.css'
import Button from '@/components/ui/Button'
import { handleSignIn } from '@/actions/firebase/auth'
import { useRouter } from 'next/navigation'
import Text from '@/components/ui/Text'

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    setError(null);
    
    const res = await handleSignIn({ email, password })

    if (res?.success) {
      router.push('/dashboard')
    } else {
      setError(res?.error || 'Something went wrong')
    }
  }

  return (
    <div className={styles.inputWrapper}>
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
        buttonType='secondary' 
        fit={true}
        onClick={handleSubmit}
      >
        Sign in
      </Button>
      {<Text error={true}>{error}</Text>}
    </div>
  )
}
