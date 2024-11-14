import React from 'react'
import styles from './index.module.css'

export default function index({
    correctChoice,
    question
} : {
    correctChoice?: boolean | null,
    question: string
}) {
  return (
    <div className={styles.choiceResultsWrapper}>
        <div className={correctChoice ? styles.correctChoice : styles.incorrectChoice}>
            {correctChoice ? 'Correct' : 'Incorrect'}
        </div>
        <p className={styles.questionText}>{question}</p>
    </div>
  )
}
