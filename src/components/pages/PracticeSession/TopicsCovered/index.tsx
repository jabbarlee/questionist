import React from 'react'
import Chip from '@/components/ui/Chip'
import styles from './index.module.css'
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper'

export default function index({
    topics
} : {
    topics: string[]
}) {
  return (
    <ChipWrapper>
        {topics.map((topic, index) => (
            <Chip key={index}>{topic}</Chip>
        ))}
    </ChipWrapper>
  )
}
