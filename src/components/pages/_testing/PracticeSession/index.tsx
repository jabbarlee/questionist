"use client"

import React, { useState } from 'react';
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { Pagination, Divider, Button } from "antd";
import { PauseOutlined, CheckOutlined } from "@ant-design/icons";
import Main from '@/components/ui/_wrappers/Main';
import Footer from '@/components/ui/_wrappers/Footer';
import Question from '@/components/ui/_testing/PracticeSession/Question';

export default function index({ sessionId }: { sessionId: string }) {
    const [currentPage, setCurrentPage] = useState(1);

    const mockQuestions = [
        {
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
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.practicePageWrapper}>
            <div className={styles.header}>
                <div>
                    <Typography className={styles.headerText}>
                        TEST-123
                    </Typography>
                </div>
                <div className={styles.buttonsContainer}>
                    <Button
                        variant={'outlined'}
                        color={'default'}
                    >
                        <PauseOutlined />
                        Pause
                    </Button>
                    <Button
                        variant={'solid'}
                        color={'primary'}
                    >
                        <CheckOutlined />
                        Finish
                    </Button>
                </div>
            </div>
            <Main>
                <div className={styles.questionsWrapper}>
                    <Question
                        key={currentPage - 1}
                        index={currentPage - 1}
                        questionText={mockQuestions[currentPage - 1].questionText}
                        options={mockQuestions[currentPage - 1].options}
                    />
                </div>
            </Main>
            <Footer>
                <div className={styles.paginationContainer}>
                    <Pagination
                        simple={{ readOnly: true }}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={mockQuestions.length * 10}
                    />
                </div>
            </Footer>
        </div>
    );
}