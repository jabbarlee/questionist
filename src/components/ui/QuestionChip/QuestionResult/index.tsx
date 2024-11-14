import React from 'react'
import styles from './index.module.css'
import { QuestionResultProps } from '../types'

export default function index({
    correctChoice,
    question
} : QuestionResultProps) {
  return (
    <div className={styles.choiceResultsWrapper}>
        <div className={correctChoice ? styles.correctChoice : styles.incorrectChoice}>
            {correctChoice ? 'Correct' : 'Incorrect'}
        </div>
        <p className={styles.questionText}>{question}</p>
    </div>
  )
}
