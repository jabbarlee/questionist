import React from 'react';
import { Tag } from 'antd';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';
import { ContractProps } from '@/types';

export const ContractCard = ({ contract }: { contract: ContractProps }) => {
  return (
    <div className={styles.contractContainer}>
      <div className={styles.contractContent}>
        <div className={styles.contractHeader} onClick={() => console.log('sdjfhs')}> 
          <Typography className={styles.contractTitle} fontSize={'20px'}>
            {contract.title}
          </Typography>
          <Typography className={styles.contractDescription} fontSize={'14px'}>{contract.description}</Typography>
        </div>
        <div className={styles.contractFooter}>
          <div className={styles.contractFooterLeft}>
            <div className={styles.rewardItem}>
              {/* <Bolt className={styles.icon} /> */}
              <Tag 
                color='cyan-inverse' 
                style={{ margin: '0' }}
              >
                +{contract.rewards.axp} AXP
              </Tag>
            </div>
            <div className={styles.rewardItem}>
              {/* <Star className={styles.icon} /> */}
              <Tag 
                color='gold-inverse'
                style={{ margin: '0' }}
              >
                +{contract.rewards.brilliants} Brilliants
              </Tag>
            </div>
          </div>
          <div className={styles.contractFooterRight}>
            <Tag className={styles.difficultyTag} color={
              contract.difficulty === 'Easy' ? 'green' : 
              contract.difficulty === 'Medium' ? 'orange' : 
              'red'
            }>{contract.difficulty}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};
