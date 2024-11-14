import React from 'react'
import styles from './index.module.css'
import Header from '@/components/ui/_wrappers/Header'
import Text from '@/components/ui/Text'

export default function index({ id }: { id: string }) {
  return (
    <div>
        <Header>
            <Text heading={true}>Practice <span className={styles.sessionText}>session</span></Text>
        </Header>
    </div>
  )
}
