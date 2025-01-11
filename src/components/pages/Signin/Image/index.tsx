import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import headerImage from '@/data/images/signin_header.png';
import signupHeaderImage from '@/data/images/signup_header.png'

export default function index({ signup }: { signup?: boolean }) {
  return (
    <>
      <Image alt="Image" src={signup ? signupHeaderImage : headerImage} className={styles.image}/>
    </>
  )
}
