import React from 'react'
import Chip from '@/components/ui/Chip'
import styles from './index.module.css'

export default function index({
    topics
} : {
    topics: string[]
}) {
  return (
    <div>
        {topics.map((topic, index) => (
            <Chip key={index}>{topic}</Chip>
        ))}
    </div>
  )
}
