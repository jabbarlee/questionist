import React from 'react';
import styles from './index.module.css';
import Input from '../Input';

interface QuestionData {
    type: 'multiple-choice' | 'open';
    question: string;
    choices?: string[];
}

export default function Question({
    type,
    question,
    choices,
} : {
    type: 'multiple-choice' | 'open',
    question: string,
    choices?: string[]
}) {
    if (!question) {
        return <p>No question data available.</p>;
    }

    return (
        <div className={styles.card}>
            <p className={styles.questionText}>{question}</p>
            {type === 'multiple-choice' && choices ? (
                <div className={styles.choices}>
                    {choices.map((choice, index) => (
                        <div key={index} className={styles.choice}>
                            <input
                                type="radio"
                                id={`choice-${index}`}
                                name="questionChoice"
                                className={styles.radioInput}
                            />
                            <label htmlFor={`choice-${index}`} className={styles.choiceLabel}>
                                {choice}
                            </label>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.openEnded}>
                    <Input placeholder="Enter your answer" className={styles.input}/>
                </div>
            )}
        </div>
    );
}
