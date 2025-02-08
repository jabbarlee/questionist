"use client"

import React from 'react';
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import Page from '@/components/ui/_wrappers/Page';
import {ContractCard} from '@/components/pages/Contracts/ContractCard';
import styles from './index.module.css';

export default function page() {
  return (
    <Page>
      <Header>Contracts</Header>
      <Main>
        <div className={styles.contractsContainer}>
          <ContractCard contract={contract} />
          <ContractCard contract={contract} />
          <ContractCard contract={contract} />
          <ContractCard contract={contract} />
        </div>
      </Main>
    </Page>
  );
}

const contract = {
  title: "Algebra Guru",
  description: "Solve 100 algebra task",
  type: "long-term",
  difficulty: "Hard",
  topics: ["Algebra, Linear Functions", "Quadratic Functions"],
  totalTasks: 100,
  timeLimit: 86400,
  rewards: {
    axp: 120,
    brilliants: 5,
    badge: "Test"
  }
};