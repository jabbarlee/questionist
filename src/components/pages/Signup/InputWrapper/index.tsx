"use client";

import React, { useState } from 'react';
import { Input, Button, Alert } from 'antd';
import styles from './index.module.css';
import { handleSignUp } from '@/actions/firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState<"info" | "error" | "success" | "warning" | undefined>('info')
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setAlertMessage('')
    setLoading(true);
    setLoading(true);

    const res = await handleSignUp({ email, password, fullName });

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
  };

  return (
    <div className={styles.inputWrapper}>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <Input 
        placeholder="Full name" 
        value={fullName} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
      />
      <Input.Password
        placeholder="Email" 
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
      />
      <Input 
        placeholder="Password" 
        value={password} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
        <Button
            color='primary'
            variant='solid'
            onClick={handleSubmit}
            loading={loading}
        >
            Sign up
        </Button>
    </div>
  );
}
