'use client';

import React, { useState } from 'react';
import TopicsSelector from '../TopicsSelector';
import SubtopicsList from '../SubtopicsList';
import styles from './index.module.css';

const topicsData = {
  'Heart of Algebra': [
    'Linear equations and inequalities',
    'Graphing linear equations and functions',
    'Word problems require linear equations',
    'Interpreting linear functions and slopes',
  ],
  'Problem Solving and Data Analysis': [
    'Ratios, proportions, and percentages',
    'Interpreting data from charts and graphs',
    'Mean, median, mode, and standard deviation',
    'Modeling relationships with two variables',
  ],
  'Passport to Advanced Math': [
    'Quadratic equations and functions',
    'Polynomials and rational expressions',
    'Manipulating algebraic expressions',
    'Non-linear systems of equations',
  ],
  'Additional Topics in Math': [
    'Geometry: angles and triangles',
    'Trigonometry and their applications',
    'Coordinate geometry problems',
  ],
};

export default function TopicsWrapper() {
  const [selectedTopic, setSelectedTopic] = useState<string>(
    Object.keys(topicsData)[0]
  );
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedSubtopics([]); // Reset subtopics when topic changes
  };

  const handleSubtopicToggle = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((item) => item !== subtopic)
        : [...prev, subtopic]
    );
  };

  return (
    <div className={styles.wrapper}>
      <TopicsSelector
        topics={Object.keys(topicsData)}
        selectedTopic={selectedTopic}
        onSelect={handleTopicSelect}
      />
      <SubtopicsList
        subtopics={topicsData[selectedTopic as keyof typeof topicsData]}
        selectedSubtopics={selectedSubtopics}
        onToggle={handleSubtopicToggle}
      />
    </div>
  );
}
