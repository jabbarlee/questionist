import React from 'react'
import styles from './index.module.css'
import { QuestionResultProps } from '../types'

export default function index({
    correctChoice,
    selectedChoice,
    question
} : QuestionResultProps) {
  return (
    <div className={styles.choiceResultsWrapper}>
        <div className={selectedChoice === correctChoice ? styles.correctChoice : styles.incorrectChoice}>
            {selectedChoice === correctChoice ? 'Correct' : 'Incorrect'}
        </div>
        <p className={styles.questionText}>{question}</p>
    </div>
  )
}
