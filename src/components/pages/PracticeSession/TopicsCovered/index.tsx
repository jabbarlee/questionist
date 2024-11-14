import React from 'react'
import Chip from '@/components/ui/Chip'
import styles from './index.module.css'
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper'
import { TopicsCoveredProps } from './types'

export default function index({
    topics
} : TopicsCoveredProps) {
  return (
    <ChipWrapper>
        {topics.map((topic, index) => (
            <Chip key={index}>{topic}</Chip>
        ))}
    </ChipWrapper>
  )
}
