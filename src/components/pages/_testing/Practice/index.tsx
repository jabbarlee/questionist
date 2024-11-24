'use client'

import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderText from '@/components/ui/_testing/HeaderText'
import Main from "@/components/ui/_wrappers/Main";
import { SmileOutlined } from '@ant-design/icons';
import Typography from "@mui/material/Typography";
import { Checkbox } from "antd";
import WelcomeBanner from '@/components/ui/_testing/WelcomeBanner'

export default function index() {
    const [calculatorOption, setCalculatorOption] = useState<string>('No Calculator');
    const [difficultyOption, setDifficultyOption] = useState<string>('Easy');

    return (
        <div className={styles.page}>
            <HeaderText>
                Practice <span className={styles.subtitleText}>makes it perfect</span>
            </HeaderText>
            <Main>
                <WelcomeBanner fullName={'Amil Jabarli'} email={'amiljabbarlee@gmail.com'}/>
                <div className={styles.explanationWrapper}>
                    <div className={styles.explanationTextWrapper}>
                        <Typography className={styles.explanationText}>
                            Start your journey with a custom set of questions. Understand your mistakes, with an advanced AI
                        </Typography>
                    </div>
                </div>
                {/*<div>*/}
                {/*    <Typography variant={'h5'}>Question Type</Typography>*/}
                {/*    <div className={styles.checkboxWrapper}>*/}
                {/*        <Checkbox>*/}
                {/*            <Typography variant={'body1'}>Unused</Typography>*/}
                {/*        </Checkbox>*/}
                {/*        <Checkbox>*/}
                {/*            <Typography variant={'body1'}>Marked</Typography>*/}
                {/*        </Checkbox>*/}
                {/*        <Checkbox>*/}
                {/*            <Typography variant={'body1'}>Omitted</Typography>*/}
                {/*        </Checkbox>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Main>
        </div>
    )
}
