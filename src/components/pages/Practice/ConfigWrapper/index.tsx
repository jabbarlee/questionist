'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopicsWrapper from '@/components/pages/Practice/_topics/TopicsWrapper';
import ToggleButtonsWrapper from '@/components/pages/Practice/ToggleButtonsWrapper';
import { topicsData } from '@/data/topics';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Divider from '@mui/material/Divider';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import ChipWrapper from '@/components/ui/_wrappers/ChipWrapper';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { storePracticeSession } from '@/actions/firebase/setDoc';
import ButtonTextWrapper from '@/components/ui/_wrappers/ButtonTextWrapper';
import styles from './index.module.css';

export default function ConfigWrapper() {
  const [calculatorOption, setCalculatorOption] = useState<string>('No Calculator');
  const [difficultyOption, setDifficultyOption] = useState<string>('Easy');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0); 
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const router = useRouter();

  const handleTopicSelect = (index: number) => {
    setSelectedTopicIndex(index);
  };

  const handleSubtopicToggle = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((item) => item !== subtopic) // Remove if already selected
        : [...prev, subtopic] // Add if not selected
    );
  };

  const handleCalculatorChange = (option: string) => setCalculatorOption(option);
  const handleDifficultyChange = (option: string) => setDifficultyOption(option);

  const handleRandomize = () => {
    // Placeholder for randomize logic
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.configWrapper}>
        <ToggleButtonsWrapper 
          calculatorOption={calculatorOption}
          difficultyOption={difficultyOption}
          onCalculatorChange={handleCalculatorChange}
          onDifficultyChange={handleDifficultyChange}
        />
        <TopicsWrapper
          topicsData={topicsData}
          selectedTopicIndex={selectedTopicIndex}
          selectedSubtopics={selectedSubtopics}
          onTopicSelect={handleTopicSelect}
          onSubtopicToggle={handleSubtopicToggle}
        />
        
        <div className={styles.buttonWrapper}>
          <Button buttonType='error' onClick={() => setSelectedSubtopics([])}>
              <ButtonTextWrapper>
                <CancelOutlinedIcon fontSize='small'/> 
                Clear topics
              </ButtonTextWrapper>
            </Button>
            <Button buttonType='primary' onClick={handleRandomize}>
              <ButtonTextWrapper>
                <BoltOutlinedIcon fontSize='small'/>
                Randomize topics
              </ButtonTextWrapper>
            </Button>
            <Button buttonType='primary' onClick={() => {storePracticeSession({ selectedSubtopics, calculatorOption, difficultyOption, router });}}>
              <ButtonTextWrapper>
                <KeyboardDoubleArrowRightIcon fontSize='small'/> 
                Start practicing
              </ButtonTextWrapper>
          </Button>
        </div>

        <Divider />
        <ChipWrapper>
          {selectedSubtopics.map((subtopic) => (
            <Chip
              key={subtopic}
              onClear={() => handleSubtopicToggle(subtopic)}
            >
              {subtopic}
            </Chip>
          ))}
        </ChipWrapper>
      </div>
    </div>
  );
}
