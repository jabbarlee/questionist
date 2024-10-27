import React from 'react'
import Text from '@/components/ui/Text'
import styles from './index.module.css'

export default function index() {
  return (
    <div>
        <Text heading={true}>
            Practice <span className={styles.titleHighlight}>makes it perfect</span>
        </Text>
    </div>
  )
}
