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
    smaller,
    italic,
    ...props 
} : TextProps) {
  return (
        <p
            {...props}
            className={`
                ${error ? styles.error : ''}
                ${success ? styles.success : ''}
                ${heading ? styles.heading : ''}
                ${subheading ? styles.subheading : ''}
                ${smaller ? styles.smaller : ''}
                ${italic ? styles.italic : ''}
                ${(!error && !success && !heading && !subheading) ? styles.baseText : ''}
            `}
        >
            {link ? (
                <Link href={link} className={styles.link} style={{ margin: '0' }}>{children}</Link>
            ) : (
                <>{children}</>
            ) }
        </p>
  )
}
