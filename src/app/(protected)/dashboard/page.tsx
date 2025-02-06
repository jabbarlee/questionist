"use client"

import React from 'react'
import Header from '@/components/ui/_wrappers/Header'
import Main from '@/components/ui/_wrappers/Main'
import Page from '@/components/ui/_wrappers/Page'
import Dashboard from '@/components/pages/Dashboard'
import { Button } from 'antd'
import { storeContracts } from '@/actions/firebase/set/storeContracts'

export default function page() {

  return (
    <Page>
        <Header>Dashboard</Header>
        <Main>
            <Dashboard />
            <Button onClick={() => storeContracts()}>Push challenges to DB</Button>
        </Main>
    </Page>
  )
}
