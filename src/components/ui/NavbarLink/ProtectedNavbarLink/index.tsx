import React from 'react'
import styles from './index.module.css'
import { NavbarLinkProps } from '../types'
import Link from 'next/link'

export default function index({
    children,
    redirect,
    underline
} : NavbarLinkProps) {
  return (
    <Link className={styles.link + ' ' + (underline ? styles.underline : '')} href={redirect}>{children}</Link>
  )
}