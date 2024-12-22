import React from 'react'
import styles from './index.module.css'
import Main from "@/components/ui/_wrappers/Main";
import WelcomeBanner from '@/components/ui/Practice/WelcomeBanner'
import SloganBanner from '@/components/ui/Practice/SloganBanner'
import CustomSet from '@/components/ui/Practice/CustomSet'
import Header from "@/components/ui/_wrappers/Header";
import Page from "@/components/ui/_wrappers/Page";

export default function index() {
    return (
        <Page>
            <Header>
                Practice makes it perfect
            </Header>
            <Main>
                <WelcomeBanner fullName={'Amil Jabarli'} email={'amiljabbarlee@gmail.com'}/>
                <CustomSet/>
                <SloganBanner/>
            </Main>
        </Page>
    )
}
