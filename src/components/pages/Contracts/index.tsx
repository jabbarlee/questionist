"use client"

import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { ContractCard } from '@/components/ui/Contracts/ContractCard';
import { SearchHeader } from '@/components/ui/Contracts/SearchHeader';
import { ContractProps } from '@/types';

export const ContractPage = () => {
    const [contracts, setContracts] = useState<ContractProps[] | null>(null);

    useEffect(() => {
        
    }, [])
  return (
    <div className={styles.contractContainer}>
        <SearchHeader />
        <div className={styles.contractsContainer}>
            <ContractCard contract={contract} />
            <ContractCard contract={contract2} />
            <ContractCard contract={contract2} />
            <ContractCard contract={contract} />
        </div>
    </div>
  );
};


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