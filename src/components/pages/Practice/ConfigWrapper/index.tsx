'use client';

import React, { useState } from 'react';
import TopicsWrapper from '@/components/pages/Practice/_topics/TopicsWrapper';
import ToggleButtonsWrapper from '@/components/pages/Practice/ToggleButtonsWrapper';
import styles from './index.module.css';
import { topicsData } from '@/data/topics';
import Button from '@/components/ui/Button';

export default function ConfigWrapper() {
  const [selectedTopic, setSelectedTopic] = useState<string>(
    Object.keys(topicsData)[0]
  );
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleSubtopicToggle = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((item) => item !== subtopic)
        : [...prev, subtopic]
    );
  };

  return (
    <div className={styles.configWrapper}>
        <ToggleButtonsWrapper />
        <TopicsWrapper
            topicsData={topicsData}
            selectedTopic={selectedTopic}
            selectedSubtopics={selectedSubtopics}
            onTopicSelect={handleTopicSelect}
            onSubtopicToggle={handleSubtopicToggle}
        />
        <div className={styles.buttonWrapper}>
            <Button buttonType='error'>Clear topics</Button>
            <Button buttonType='primary'>Randomize topics</Button>
        </div>
    </div>
  );
}
