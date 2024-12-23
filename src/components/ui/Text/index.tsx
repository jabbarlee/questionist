import React from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { TextProps } from './types'

export default function index({ 
    children,
    error,
    success,
    heading,
    subheading,
    link,
    ...props 
} : TextProps) {
  return (
    <div {...props} className={styles.textWrapper}>
        <p 
            {...props}
            className={`
                ${error ? styles.error : ''}
                ${success ? styles.success : ''}
                ${heading ? styles.heading : ''}
                ${subheading ? styles.subheading : ''}
                ${(!error && !success && !heading && !subheading) ? styles.baseText : ''}
            `}
        >
            {link ? (
                <Link href={link} className={styles.link} style={{ margin: '0' }}>{children}</Link>
            ) : (
                <>{children}</>
            ) }
        </p>
    </div>
  )
}
