"use client"

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import styles from './index.module.css'
import Button from '@/components/ui/Button'
import { handleSignIn, handleSignUp } from '@/actions/handleAuth'
import { useRouter } from 'next/navigation'

export default function index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const router = useRouter()

  return (
      <div className={styles.inputWrapper}>
        <Input 
          placeholder='Full name' 
          value={fullName} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
        />
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
          onClick={async () => {
            const res = await handleSignUp({ email, password, fullName })

            if(res) {
              router.push('/dashboard')
            }
          }}
        >
          Sign up
        </Button>
      </div>
  )
}
