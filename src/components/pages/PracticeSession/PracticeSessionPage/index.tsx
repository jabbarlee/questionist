import React from 'react'
import Text from '@/components/ui/Text'
import styles from './index.module.css'

export default function index({
    sessionId
} : {
    sessionId: string
}) {

  return (
    <div>
        <Text heading={true}>
            Practice <span className={styles.titleHighlight}>session</span>
        </Text>
        
    </div>
  )
}
