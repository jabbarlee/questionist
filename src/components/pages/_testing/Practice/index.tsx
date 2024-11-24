'use client'

import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderText from '@/components/ui/_testing/HeaderText'
import Main from "@/components/ui/_wrappers/Main";
import { SmileOutlined } from '@ant-design/icons';
import Typography from "@mui/material/Typography";
import { Checkbox } from "antd";
import WelcomeBanner from '@/components/ui/_testing/WelcomeBanner'
import SloganBanner from '@/components/ui/_testing/SloganBanner'

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
                <SloganBanner/>
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
