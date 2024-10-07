import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import headerImage from '@/data/images/header.png';

export default function index({ ...props }) {
  return (
    <div {...props}>
      <div className={styles.image}>
        <Image alt="Image" src={headerImage} height={300} width={500}/>
      </div>
    </div>
  )
}
