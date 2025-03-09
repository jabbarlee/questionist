"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import {Button, Progress, Alert, Tag, Divider } from "antd";
import { Typography } from "@mui/material"
import Header from "@/components/ui/_wrappers/Header";
import Main from "@/components/ui/_wrappers/Main";
import Page from "@/components/ui/_wrappers/Page";
import { Card } from "@/components/ui/Card"

export default function PracticeCreate() {

    return (
        <Page>
            <Header>
                Create Practice Set
            </Header>
            <Main>
                <div className={styles.pageWrapper}>
                    <div className={styles.headerSideWrapper}>
                        <div className={styles.createYourOwnWrapper}>
                            <Card 
                                heading="Customize practice set"
                                subHeading="Configure only the topics you want to practice"
                                isLarge
                                variant="secondary"
                            >
                                <Button
                                    variant="solid"
                                    color="primary"
                                    block
                                    size="large"
                                >
                                    Start configuring
                                </Button>
                            </Card>
                        </div>
                        <div className={styles.createYourOwnWrapper}>
                            <Card 
                                heading="Real-time exam mode"
                                subHeading="Practice it like it is the exam day? Try one for free"
                                isLarge
                                variant="premium"
                            >
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        block
                                        size="large"
                                        className={styles.premiumButton}
                                    >
                                        Try for free
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        block
                                        size="large"
                                    >
                                        See pricing
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <Divider style={{ margin: 0 }}/>
                    <div className={styles.footerWrapper}>
                        <Typography className={styles.heading} fontSize={'28px'}>Essential Math Concepts for SAT Success</Typography>
                    </div>
                </div>
            </Main>
        </Page>
    );
}
