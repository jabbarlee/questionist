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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const res = await handleSignUp({ email, password, fullName });

    if (res?.success) {
      router.push('/dashboard');
    } else {
      setError(res?.error || 'Something went wrong');
    }
  };

  return (
    <div className={styles.inputWrapper}>
      {error && <Alert message={error} type='error' />}
      <Input 
        placeholder="Full name" 
        value={fullName} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
      />
      <Input 
        placeholder="Email" 
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
