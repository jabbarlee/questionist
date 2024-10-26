import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import { Url } from 'next/dist/shared/lib/router/router'

export default function index({
    children,
    redirect,
    underline
} : {
    children: React.ReactNode,
    redirect: Url | '/',
    underline?: boolean
}) {
  return (
    <Link className={styles.link + ' ' + (underline ? styles.underline : '')} href={redirect}>{children}</Link>
  )
}
