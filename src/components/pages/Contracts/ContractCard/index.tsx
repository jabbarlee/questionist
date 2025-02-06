import React from 'react';
import { Button } from 'antd';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';

export const ContractCard = ({ contract }: {
    contract: {
      title: string;
      description: string;
      type: string;
      difficulty: string;
      topics: string[];
      totalTasks: number;
      timeLimit: number;
      rewards: {
        axp: number;
        brilliants: number;
        badge: string;
      };
    };
  }) => {
    return (
      <div className={styles.contractContainer}>
        <div className={styles.contractContent}>
          <Typography variant="h6" className={styles.contractTitle}>
            {contract.title}
          </Typography>
          <Typography variant="body1" className={styles.contractDescription}>
            {contract.description}
          </Typography>
          <div className={styles.contractDetails}>
            <div className={styles.detailsSection}>
              <Typography variant="body2"><strong>Type:</strong> {contract.type}</Typography>
              <Typography variant="body2"><strong>Difficulty:</strong> {contract.difficulty}</Typography>
              <Typography variant="body2"><strong>Topics:</strong> {contract.topics.join(', ')}</Typography>
              <Typography variant="body2"><strong>Total Tasks:</strong> {contract.totalTasks}</Typography>
              <Typography variant="body2"><strong>Time Limit:</strong> {contract.timeLimit / 86400} days</Typography>
            </div>
          </div>
          <Button type="primary" className={styles.activateButton}>
            Activate Contract
          </Button>
        </div>
        <div className={styles.rewardsSection}>
          <Typography variant="h6" className={styles.rewardsTitle}>
            Rewards
          </Typography>
          <div className={styles.rewardsDetails}>
            <Typography variant="body2">AXP: {contract.rewards.axp}</Typography>
            <Typography variant="body2">Brilliants: {contract.rewards.brilliants}</Typography>
            <Typography variant="body2">Badge: {contract.rewards.badge}</Typography>
          </div>
        </div>
      </div>
    );
  };