"use client"

import React from 'react';
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import Page from '@/components/ui/_wrappers/Page';
import Dashboard from '@/components/pages/Dashboard';

export default function page() {
  return (
    <Page>
      <Header>Dashboard</Header>
      <Main>
        <Dashboard />
      </Main>
    </Page>
  );
}