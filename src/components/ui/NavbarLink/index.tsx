import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import { Url } from 'next/dist/shared/lib/router/router'

export default function index({
    children,
    redirect
} : {
    children: React.ReactNode,
    redirect: Url | '/'
}) {
  return (
    <Link className={styles.link} href={redirect}>{children}</Link>
  )
}
