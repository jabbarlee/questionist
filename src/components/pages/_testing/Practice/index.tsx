import React from 'react'
import styles from './index.module.css'
import HeaderText from '../../../ui/HeaderText'
import Main from "@/components/ui/_wrappers/Main";
import WelcomeBanner from '@/components/ui/Practice/WelcomeBanner'
import SloganBanner from '@/components/ui/Practice/SloganBanner'
import CustomSet from '@/components/ui/Practice/CustomSet'
import Typography from "@mui/material/Typography";

export default function index() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Typography className={styles.headerText}>Practice <span className={styles.subtitleText}>makes it perfect</span></Typography>
            </div>
            <Main>
                <WelcomeBanner fullName={'Amil Jabarli'} email={'amiljabbarlee@gmail.com'}/>
                <CustomSet/>
                <SloganBanner/>
            </Main>
        </div>
    )
}
