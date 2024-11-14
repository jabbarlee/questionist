import React from 'react';
import styles from './index.module.css';
import Input from '../Input';
import { QuestionChip } from './types';

export default function Question({
    type,
    question,
    choices,
    selectedChoice,
    onSelectChoice,
    questionIndex,
    correctChoice
} : QuestionChip) {
    if (!question) {
        return <p>No question data available.</p>;
    }

    return (
        <div className={styles.card}>            
            <p className={styles.questionText}>{question}</p>
            {type === 'multiple-choice' && choices ? (
                <div className={styles.choices}>
                    {onSelectChoice ? choices.map((choice, index) => (
                        <div key={index} className={styles.choiceContainer}>
                            <input
                                type="radio"
                                id={`choice-${index}`}
                                name={`question-${questionIndex}`}
                                className={styles.radioInput}
                                value={choice}
                                checked={selectedChoice === choice}
                                onChange={() => onSelectChoice(choice)}
                            />
                            <label className={styles.choiceLabel}>
                                {choice}
                            </label>
                        </div>
                    )) : (
                        choices.map((choice, index) => (
                            <div key={index} className={styles.choiceContainer}>
                                <input
                                    type="radio"
                                    id={`choice-${index}`}
                                    name={`question-${questionIndex}`}
                                    className={correctChoice ? styles.correctChoice : styles.incorrectChoice}
                                    value={choice}
                                    checked={selectedChoice === choice}
                                />
                                <label className={styles.choiceLabel}>
                                    {choice}
                                </label>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className={styles.openEnded}>
                    <Input placeholder="Enter your answer" className={styles.input}/>
                </div>
            )}
        </div>
    );
}
