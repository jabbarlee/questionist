import React from 'react'
import styles from './index.module.css'
import { QuestionChoiceProps } from '../types'

export default function index({
    choice,
    selectedChoice,
    onSelectChoice,
    questionIndex,
    correctChoice
} : QuestionChoiceProps) {
  return (
    <div className={styles.choiceContainer}>
        {onSelectChoice ? (
            <>
                <input
                    type="radio"
                    id={`choice-${questionIndex}`}
                    name={`question-${questionIndex}`}
                    className={styles.radioInput}
                    value={choice}
                    checked={selectedChoice === choice}
                    onChange={() => onSelectChoice(choice)}
                />
                <label className={styles.choiceLabel}>
                    {choice}
                </label>
            </>
        ) : ( 
            <>
                <input
                    type="radio"
                    id={`choice-${index}`}
                    name={`question-${questionIndex}`}
                    className={selectedChoice === correctChoice ? styles.correctChoice : styles.incorrectChoice}
                    value={choice}
                    checked={selectedChoice === choice}
                    readOnly
                />
                <label className={styles.choiceLabel}>
                    {choice}
                </label>
            </>
        )}
    </div>
  )
}
