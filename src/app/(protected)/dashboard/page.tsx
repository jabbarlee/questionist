"use client"

import React from 'react'
import Header from '@/components/ui/_wrappers/Header'
import Main from '@/components/ui/_wrappers/Main'
import Page from '@/components/ui/_wrappers/Page'
import Dashboard from '@/components/pages/Dashboard'
import { Timer } from '@/components/ui/Timer'

export default async function page() {

  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);

  return (
    <Page>
        <Header>Dashboard</Header>
        <Main>
            <Dashboard />
            <Timer expiryTimestamp={time} />
        </Main>
    </Page>
  )
}
