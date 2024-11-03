import React from 'react'
import styles from './index.module.css'

interface QuestionData {
    type: 'multiple-choice' | 'open';
    question: string;
    choices?: string[];
}

export default function index({
    questionData
} : {
    questionData: QuestionData
}) {
    if (!questionData || !questionData.question) {
        return <p>No question data available.</p>;
      }
      
  return (
    <div className={styles.chipWrapper}> 
        <p>{questionData.question}</p>
        {questionData.type === 'multiple-choice' && questionData.choices ? (
            <ul>
            {questionData.choices.map((choice: string, index) => (
                <li key={index}>{choice}</li>
            ))}
            </ul>
        ) : (
            <p>Open-ended question. Provide your answer below:</p>
        )}
    </div>
  )
}
