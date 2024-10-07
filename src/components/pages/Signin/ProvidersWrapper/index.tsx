import React from 'react'
import styles from './index.module.css'
import Provider from '@/components/ui/Provider'

export default function index() {
  return (
    <div>
        <Provider provider='google'>
            Continue with Google
        </Provider>
        <Provider provider='apple'>
            Continue with Apple
        </Provider>
    </div>
  )
}
