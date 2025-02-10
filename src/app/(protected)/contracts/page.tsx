"use client"

import React from 'react';
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import Page from '@/components/ui/_wrappers/Page';
import { ContractPage } from '@/components/pages/Contracts';
import styles from './index.module.css';

export default function page() {
  return (
    <Page>
      <Header>Contracts</Header>
      <Main>
        <ContractPage />
      </Main>
    </Page>
  );
}