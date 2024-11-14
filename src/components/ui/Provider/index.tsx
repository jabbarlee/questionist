import React from 'react'
import Button from '../Button'
import GoogleIcon from '@/data/icons/GoogleIcon'
import AppleIcon from '@/data/icons/AppleIcon'
import styles from './index.module.css'
import { ProviderProps } from './types'

export default function index({
    provider,
    children
} : ProviderProps) {
    let icon = null
    if (provider === 'google') {
        icon = <GoogleIcon />
    } else if (provider === 'apple') {
        icon = <AppleIcon />
    }
    
  return (
    <div>
        <Button buttonType='primary'>
            <div className={styles.providerWrapper}>
                <div>
                    {icon}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Button>
    </div>
  )
}
