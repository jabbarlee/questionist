"use client"

import React from 'react'
import styles from './index.module.css'
import Main from "@/components/ui/_wrappers/Main";
import { Tag } from 'antd';
import SloganBanner from '@/components/ui/Practice/SloganBanner'
import CustomSet from '@/components/ui/Practice/CustomSet'
import Header from "@/components/ui/_wrappers/Header";
import Page from "@/components/ui/_wrappers/Page";
import Typography from "@mui/material/Typography";
import { Button } from 'antd';
import { useRouter } from 'next/navigation'
import { PracticeStartProps } from '@/types';
import { storePracticeSession } from '@/actions/firebase/setDoc';

export default function index() {
    const router = useRouter()

    const handlePopularSetStart = async({
                                            topics,
                                            difficulty,
                                            sessionName,
                                            numberOfQuestions
                                        }: PracticeStartProps) => {
        try{
            const { success, sessionId } = await storePracticeSession({ topics, difficulty, sessionName, numberOfQuestions });

            if(success && sessionId){
                router.push(`/practice/session/${sessionId}`)
            }
        }catch(error){
            console.error('Error starting popular set: ', error)
        }
    }

    return (
        <Page>
            <Header>
                Practice
            </Header>
            <Main>
                <div className={styles.wrapper}>
                    <div className={styles.customSetWrapper}>
                        <CustomSet/>
                        <div className={styles.popularSetsWrapper}>
                            <Typography className={styles.stepHeadingText}>Popular Practice Sets</Typography>
                            <div className={styles.popularSets}>
                                <div className={styles.setCard}>
                                    <Typography className={styles.setTitle}>Algebra Essentials</Typography>
                                    <Typography className={styles.setDetails}>
                                        <Tag color={'magenta'}>Medium</Tag>
                                        <Tag>10 questions</Tag>
                                    </Typography>
                                    <Button
                                        color="primary"
                                        size="large"
                                        variant='filled'
                                        style={{ textDecoration: 'none', width: '100%' }}
                                        onClick={() => handlePopularSetStart({
                                            topics: ['algebra'],
                                            difficulty: ['medium'],
                                            sessionName: 'Algebra Essentials',
                                            numberOfQuestions: 10
                                        })}
                                    >
                                        Start Now
                                    </Button>
                                </div>
                                <div className={styles.setCard}>
                                    <Typography className={styles.setTitle}>Geometry Basics</Typography>
                                    <Typography className={styles.setDetails}>
                                        <Tag color={'green'}>Easy</Tag>
                                        <Tag>15 questions</Tag>
                                    </Typography>
                                    <Button
                                        color="primary"
                                        variant='filled'
                                        style={{ textDecoration: 'none', width: '100%' }}
                                        size="large"
                                        onClick={() => handlePopularSetStart({
                                            topics: ['geometry'],
                                            difficulty: ['easy'],
                                            sessionName: 'Geometry Basic',
                                            numberOfQuestions: 15
                                        })}
                                    >
                                        Start Now
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.howToUseWrapper}>
                        <div className={styles.stepsWrapper}>
                            <Typography className={styles.stepHeadingText}>Learn. Practice. Excel.</Typography>
                            <div className={styles.stepsContainer}>
                                <div className={styles.step}>
                                    <Tag color="blue" className={styles.stepTag}>
                                        Earn rewards
                                    </Tag>
                                    <div className={styles.stepContent}>
                                        <p className={styles.stepSubText}>As you progress you will gain more points
                                            which you can use later</p>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <Tag color="green" className={styles.stepTag}>
                                        AI-Powered Questions
                                    </Tag>
                                    <div className={styles.stepContent}>
                                        <p className={styles.stepSubText}>Each set is customized for your own needs</p>
                                    </div>
                                </div>
                                <div className={styles.step}>
                                    <Tag color="purple" className={styles.stepTag}>
                                        Track Progress
                                    </Tag>
                                    <div className={styles.stepContent}>
                                        <p className={styles.stepSubText}>See detailed analytics and performance trends over time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        </Page>
    )
}