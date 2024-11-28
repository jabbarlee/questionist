import React from 'react';
import styles from "@/components/pages/_testing/PracticeSession/index.module.css";
import { Typography } from "@mui/material";
import { Radio } from "antd";
import Main from '@/components/ui/_wrappers/Main';
import { CloseOutlined } from '@ant-design/icons';
import Question from '@/components/ui/_testing/PracticeSession/Question'

export default function index({ sessionId }: { sessionId: string }) {

    const mockQuestions = [
        {
            //questionNumber should be passed from index parameter
            questionText: 'This is some kind of a question text',
            options: [
                { id: 'a', text: 'a + b' },
                { id: 'b', text: '2a + b + 3c' },
                { id: 'c', text: '2b + 1' },
                { id: 'd', text: '4a + c' },
            ]
        },
        {
            questionText: 'Another question',
            options: [
                { id: 'a', text: 'a + b' },
                { id: 'b', text: '2a + b + 3c' },
                { id: 'c', text: '2b + 1' },
                { id: 'd', text: '4a + c' },
            ]
        },
        {
            questionText: 'This is some kind of a question text',
            options: [
                { id: 'a', text: 'a + b' },
                { id: 'b', text: '2a + b + 3c' },
                { id: 'c', text: '2b + 1' },
                { id: 'd', text: '4a + c' },
            ]
        }
    ]
    //TODO: implement radio buttons value change

    //TODO: UI | change header
    return (
        <div className={styles.practicePageWrapper}>
            <div className={styles.header}>
                <Typography className={styles.headerText}>
                    Practice Session
                </Typography>
            </div>
            <Main>
                <div className={styles.questionsWrapper}>
                    {mockQuestions.map((question, index) => (
                        <Question
                            key={index}
                            index={index}
                            questionText={question.questionText}
                            options={question.options}
                        />
                    ))}
                </div>
            </Main>
        </div>
    );
}
