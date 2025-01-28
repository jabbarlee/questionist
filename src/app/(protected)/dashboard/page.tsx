'use client'

import React from 'react'
import Header from '@/components/ui/_wrappers/Header'
import Main from '@/components/ui/_wrappers/Main'
import Page from '@/components/ui/_wrappers/Page'
import Dashboard from '@/components/pages/Dashboard'
import {Button} from 'antd'
import { updatePointsManual } from '@/actions/firebase/update/updateLevel'

export default async function page() {

  return (
    <Page>
        <Header>Dashboard</Header>
        <Main>
            <Dashboard />
            <Button onClick={() => updatePointsManual({ points: 20 })}>Add 20 points</Button>
            <Button onClick={() => updatePointsManual({ points: 100 })}>Add 100 points</Button>
        </Main>
    </Page>
  )
}
