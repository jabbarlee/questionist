"use client"

import React from 'react';
import Header from '@/components/ui/_wrappers/Header';
import Main from '@/components/ui/_wrappers/Main';
import Page from '@/components/ui/_wrappers/Page';
import {ContractCard} from '@/components/pages/Contracts/ContractCard';
import { SearchHeader } from '@/components/pages/Contracts/SearchHeader';
import styles from './index.module.css';

export default function page() {
  return (
    <Page>
      <Header>Contracts</Header>
      <Main>
        <SearchHeader />
        <div className={styles.contractsContainer}>
          <ContractCard contract={contract} />
          <ContractCard contract={contract2} />
          <ContractCard contract={contract2} />
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

const contract2 = {
  title: "Geometry Master",
  description: "Complete 50 geometry problems",
  type: "short-term",
  difficulty: "Medium",
  topics: ["Triangles", "Circles", "Polygons"],
  totalTasks: 50,
  timeLimit: 43200,
  rewards: {
    axp: 80,
    brilliants: 3,
    badge: "Geometry Expert"
  }
}