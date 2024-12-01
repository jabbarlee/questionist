"use client"

import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Typography from "@mui/material/Typography";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import {Input, Divider, Button} from "antd";
import Header from "@/components/ui/_wrappers/Header";
import DifficultySelect from "@/components/ui/PracticeCreate/DifficultySelect";
import QuestionTypeSelect from "@/components/ui/PracticeCreate/QuestionTypeSelect";
import TopicsSelect from "@/components/ui/PracticeCreate/TopicsSelect";
import QuestionNumSelect from "@/components/ui/PracticeCreate/QuestionNumSelect";

export default function index() {
    const [difficulty, setDifficulty] = useState<string[] | null>([]);
    const [questionType, setQuestionType] = useState<string[] | null>([]);
    const [topics, setTopics] = useState<string[] | null>([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(null);

    useEffect(() => {
        console.log(numberOfQuestions);
    }, [numberOfQuestions])

    //TODO: UI | Button disabled on elements that are not selected

    return (
        <Page>
            <Header>
                Customize a set
            </Header>
            <Main>
                <div className={styles.configWrapper}>
                    <DifficultySelect
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                    />
                    <QuestionTypeSelect
                        questionType={questionType}
                        setQuestionType={setQuestionType}
                    />
                    <TopicsSelect
                        topics={topics}
                        setTopics={setTopics}
                    />
                    <QuestionNumSelect
                        numberOfQuestions={numberOfQuestions}
                        setNumberOfQuestions={setNumberOfQuestions}
                    />
                    <div className={styles.configName}>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Name</Typography>
                        </Divider>
                        <Input
                            showCount
                            maxLength={20}
                            placeholder={'12345-TEST'}
                            size="large"
                        />
                    </div>
                    <div>
                        <Button
                            color={'primary'}
                            variant={'solid'}
                            size={'large'}
                            style={{textDecoration: 'none'}}
                            href={'/practice/session/PTG-12345'}
                        >
                            Create!
                        </Button>
                    </div>
                </div>
            </Main>
        </Page>
    );
}
