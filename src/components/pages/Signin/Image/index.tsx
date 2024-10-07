import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import headerImage from '@/data/images/header.png';

export default function index() {
  return (
    <div className={styles.image}>
      <Image alt="Image" src={headerImage} width={600} height={300}/>
    </div>
  )
}
