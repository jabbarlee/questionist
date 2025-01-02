import React from 'react'
import styles from './index.module.css'
import Main from "@/components/ui/_wrappers/Main";
import { Tag } from 'antd';
import SloganBanner from '@/components/ui/Practice/SloganBanner'
import CustomSet from '@/components/ui/Practice/CustomSet'
import Header from "@/components/ui/_wrappers/Header";
import Page from "@/components/ui/_wrappers/Page";
import Typography from "@mui/material/Typography";

export default function index() {
    return (
        <Page>
            <Header>
                Practice makes it perfect
            </Header>
            <Main>
                <div className={styles.wrapper}>
                    <div className={styles.widthWrapper}>
                        <CustomSet/>
                    </div>
                    <div className={styles.widthWrapper}>
                        <div className={styles.stepsWrapper}>
                            <Typography className={styles.stepHeadingText}>How It Works</Typography>
                            <div className={styles.stepsContainer}>
                                <div className={styles.step}>
                                    <Tag color="blue" className={styles.stepTag}>
                                        Earn rewards
                                    </Tag>
                                    <div className={styles.stepContent}>
                                        <p className={styles.stepSubText}>As you progress you will gain more points which you can use later</p>
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
