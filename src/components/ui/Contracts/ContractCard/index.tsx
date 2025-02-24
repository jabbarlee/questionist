import React from 'react';
import { Tag } from 'antd';
import Typography from '@mui/material/Typography';
import { Stopwatch } from '@/data/icons/contracts';
import styles from './index.module.css';
import { ContractProps } from '@/types';
import { Card } from "@/components/ui/Card"

export const ContractCard = ({ 
  contract, 
  special,
  openModal
 }: { 
  contract: ContractProps, 
  special?: boolean
  openModal: React.MouseEventHandler<HTMLDivElement> 
}) => {

  const formatTimeLimit = (timeLimit: number): string => {
    if (!timeLimit || timeLimit <= 0) return "No time limit";
  
    const minutes = Math.floor(timeLimit / 60);
    const days = Math.floor(minutes / 1440); // 1 day = 1440 minutes
    const hours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;
  
    let formattedTime = "";
    if (days > 0) formattedTime += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0) formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (remainingMinutes > 0 && days === 0) formattedTime += `${remainingMinutes} min`;
  
    return formattedTime.trim();
  };

  const formattedTimeLimit = formatTimeLimit(contract.timeLimit);

  return (
    <div className={styles.contractContainer}>
      <Card
        specialTitle={special ? 'Special' : undefined}
        variant={special ? 'premium' : undefined}
        heading={contract.title}
        subHeading={contract.description}
        
      >
        <div className={styles.cardContentWrapper}>
          <div>
            <Tag>
              <div className={styles.timeLimitWrapper}>
                <Stopwatch/>
                {formattedTimeLimit}
              </div>
            </Tag>
          </div>
          <div>
            <Tag color='cyan-inverse'>+ {contract.rewards.axp} AXP</Tag>
            <Tag color='gold-inverse'>+ {contract.rewards.brilliants} Brilliants</Tag>
          </div>
        </div>
      </Card>
    </div>
  );
};
