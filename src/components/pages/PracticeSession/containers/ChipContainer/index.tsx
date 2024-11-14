import React from 'react'
import styles from './index.module.css'
import Header from '@/components/ui/_wrappers/Header'
import Text from '@/components/ui/Text'
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper'
import Chip from '@/components/ui/Chip'
import ChipsContainer from '@/components/ui/_wrappers/ChipsContainer'
import { Skeleton } from '@mui/material'

export default function index({
    sessionData
} : {
    sessionData: any
}) {
  return (
    <Header>
        <Text heading={true}>Practice <span className={styles.sessionText}>session</span></Text>
        <ChipsContainer>
            {sessionData && sessionData.selectedSubtopics.length > 0 ? (
              <ChipWrapper>
                  {sessionData.selectedSubtopics.map((subtopic: string, index: number) => (
                    <Chip key={index}>{subtopic}</Chip>
                  ))}
              </ChipWrapper>
            ) : (
              <div>
                <Skeleton variant="text"  />
              </div>
            )}
        </ChipsContainer>
      </Header>
  )
}
