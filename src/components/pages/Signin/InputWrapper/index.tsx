"use client"

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import styles from './index.module.css'
import Button from '@/components/ui/Button'
import { handleSignIn, handleSignUp } from '@/actions/handleAuth'

export default function index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          onClick={() => handleSignIn({ email, password })}
        >
          Sign in
        </Button>
      </div>
  )
}
