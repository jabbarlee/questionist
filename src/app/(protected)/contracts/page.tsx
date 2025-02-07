"use client"

import React from 'react';
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import Page from '@/components/ui/_wrappers/Page';
import {ContractCard} from '@/components/pages/Contracts/ContractCard';

export default function page() {
  return (
    <Page>
      <Header>Contracts</Header>
      <Main>
        <ContractCard contract={contract} />
      </Main>
    </Page>
  );
}

const contract = {
  title: "Test Contract",
  description: "This is a test contract",
  type: "Test",
  difficulty: "Test",
  topics: ["Test"],
  totalTasks: 1,
  timeLimit: 86400,
  rewards: {
    axp: 100,
    brilliants: 100,
    badge: "Test"
  }
};