import React from 'react';
import styles from './index.module.css';
import Input from '../Input';
import { QuestionChipProps } from './types';
import QuestionChoice from './QuestionChoice';
import QuestionResult from './QuestionResult';

export default function Question({
    type,
    question,
    choices,
    selectedChoice,
    onSelectChoice,
    questionIndex,
    correctChoice
} : QuestionChipProps) {
    if (!question) {
        return <p>No question data available.</p>;
    }

    console.log({
        // 'Type: ': type,
        // 'Question: ': question,
        // 'Choices: ': choices,
        'Selected choice: ': selectedChoice,
        'Question index: ': questionIndex,
        'Correct choice: ': correctChoice,

    })

    return (
        <div className={styles.card}>            
            {onSelectChoice ? (
                <p className={styles.questionText}>{question}</p>
            ) : (
                <QuestionResult 
                    correctChoice={correctChoice}
                    question={question}
                />
            )}
            {type === 'multiple-choice' && choices ? (
                <div className={styles.choices}>
                    {choices.map((choice, index) => (
                        <QuestionChoice
                            key={index}
                            choice={choice}
                            selectedChoice={selectedChoice}
                            onSelectChoice={onSelectChoice}
                            questionIndex={questionIndex}
                            correctChoice={correctChoice}
                        />
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
