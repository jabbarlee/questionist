import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import headerImage from '@/data/images/signin_header.png';

export default function index({ ...props }) {
  return (
    <>
      <Image alt="Image" src={headerImage} className={styles.image}/>
    </>
  )
}
