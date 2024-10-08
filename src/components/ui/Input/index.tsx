import React from 'react'
import styles from './index.module.css'

export default function index({
    ...props
}) {
  return (
    <div>
        <input {...props} className={styles.input}/>
    </div>
  )
}
