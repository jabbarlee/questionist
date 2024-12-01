import React from 'react'
import styles from './index.module.css'
import {Checkbox, Collapse, Divider} from "antd";
import Typography from "@mui/material/Typography";
import { categories } from "@/data/configData";

export default function index({
    topics,
    setTopics
}: {
    topics: string[] | null,
    setTopics:  React.Dispatch<React.SetStateAction<string[] | null>>
}) {

    const collapseItems = categories.map((category, index) => ({
        key: index.toString(),
        label: (
            <Typography className={styles.categoryHeaderText}>
                {category.category}
            </Typography>
        ),
        children: (
            <div className={styles.categoriesContainer}>
                {category.topics.map((topic, topicIndex) => (
                    <Checkbox
                        key={topicIndex}
                        className={styles.categoryWrapper}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setTopics([...(topics || []), topic]);
                            } else {
                                setTopics(topics?.filter((t) => t !== topic) || []);
                            }
                        }}
                    >
                        <Typography className={styles.radioText}>{topic}</Typography>
                    </Checkbox>
                ))}
            </div>
        ),
    }));


    return (
        <>
            <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                <Typography className={styles.titleText}>Categories</Typography>
            </Divider>
            <Collapse
                size="large"
                defaultActiveKey={['0', '1', '2', '3']}
                items={collapseItems}
            />
        </>
    )
}
