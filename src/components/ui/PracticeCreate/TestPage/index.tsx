"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import {Button, Progress, Alert, Tag} from "antd";
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
                    <div className={styles.leftSideWrapper}>
                        <div className={styles.createYourOwnWrapper}>
                            <Card 
                                heading="Customize your own practice set"
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
                        <div className={styles.progressWrapper}>

                        </div>
                    </div>
                    <div className={styles.rightSideWrapper}>
                        
                    </div>
                </div>
            </Main>
        </Page>
    );
}
