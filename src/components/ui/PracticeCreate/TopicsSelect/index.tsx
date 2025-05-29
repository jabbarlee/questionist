"use client";

import React from "react";
import { Collapse, Checkbox, Typography } from "antd";
import { categories } from "@/data/configData";
import styles from "./index.module.css";

const { Panel } = Collapse;

type TopicsSelectProps = {
  topics: string[] | null;
  setTopics: React.Dispatch<React.SetStateAction<string[] | null>>;
};

export default function TopicsSelect({ topics, setTopics }: TopicsSelectProps) {
  const handleChange = (checkedValue: string, checked: boolean) => {
    if (checked) {
      setTopics([...(topics || []), checkedValue]);
    } else {
      setTopics((topics || []).filter((t) => t !== checkedValue));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.title}>Topics</Typography>
      <Collapse
        defaultActiveKey={categories.map((_, i) => i.toString())}
        ghost
        className={styles.collapse}
      >
        {categories.map((category, idx) => (
          <Panel header={category.category} key={idx}>
            <div className={styles.topicContainer}>
              {category.topics.map((topic, i) => (
                <Checkbox
                  key={i}
                  checked={topics?.includes(topic)}
                  onChange={(e) => handleChange(topic, e.target.checked)}
                  className={`${styles.checkbox} ${
                    topics?.includes(topic) ? styles.checked : ""
                  }`}
                >
                  {topic}
                </Checkbox>
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
