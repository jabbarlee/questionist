import React from 'react';
import styles from './index.module.css';
import Typography from "@mui/material/Typography";
import Main from "@/components/ui/_wrappers/Main";
import {Input, Radio, Checkbox, Collapse, Divider, Button} from "antd";

export default function Page() {

    const categories = [
        {
            category: 'Problem Solving and Data Analysis',
            topics: ['Percentages', 'Ratios', 'Probabilities', 'Statistics', 'Quantitative Data', 'Proportions Units']
        },
        {
            category: 'Advanced Math',
            topics: ['Quadratic Equations Functions', 'Function Notations', 'Exponential Functions', 'Absolute Values', 'Radical Expressions', 'Rational Expressions']
        },
        {
            category: 'Algebra',
            topics: ['Linear Equations', 'Systems of Linear Equations', 'Operations', 'Equivalent Expressions', 'Word Problems', 'Inequalities']
        },
        {
            category: 'Geometry and Trigonometry',
            topics: ['Angles', 'Triangles', 'Circles', 'Polygons', 'Trigonometry']
        }
    ];

    const difficultyLevels = [
        {
            difficulty: 'Easy',
            description: 'Beginner level questions that are easy to solve'
        },
        {
            difficulty: 'Medium',
            description: 'Medium level questions, suitable for most students'
        },
        {
            difficulty: 'Hard',
            description: 'Hard level questions, suitable for advanced students'
        }
    ]

    //TODO: Export difficultyLevels and categories to a separate file

    //TODO: UI | Button disabled on elements that are not selected

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
                    <Checkbox key={topicIndex} className={styles.categoryWrapper} defaultChecked={true}>
                        <Typography className={styles.radioText}>{topic}</Typography>
                    </Checkbox>
                ))}
            </div>
        ),
    }));

    return (
        <div className={styles.practicePageWrapper}>
            <div className={styles.header}>
                <Typography className={styles.headerText}>
                    Customize a <span className={styles.subtitleText}>set</span>
                </Typography>
            </div>
            <Main>
                <div className={styles.configWrapper}>
                    <div className={styles.configDifficulty}>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Difficulty</Typography>
                        </Divider>
                        <div className={styles.radioButtonsWrapper}>
                            {difficultyLevels.map((level, index) => (
                                <div className={styles.radioWrapper} key={index}>
                                    <Checkbox defaultChecked={true}>
                                        <Typography className={styles.radioText}>{level.difficulty}</Typography>
                                        <Typography className={styles.radioSubText}>
                                            {level.description}
                                        </Typography>
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.configQuestionType}>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Question Type</Typography>
                        </Divider>
                        <div className={styles.questionTypeWrapper}>
                            <Checkbox>
                                <Typography className={styles.radioText}>Mix</Typography>
                                <Typography className={styles.radioSubText}>
                                    Mix of all question types
                                </Typography>
                            </Checkbox>
                            <Checkbox>
                                <Typography className={styles.radioText}>Marked</Typography>
                                <Typography className={styles.radioSubText}>
                                    Questions that were previously marked by you
                                </Typography>
                            </Checkbox>
                            <Checkbox>
                                <Typography className={styles.radioText}>Omitted</Typography>
                                <Typography className={styles.radioSubText}>
                                    Questions that were previously omitted by you
                                </Typography>
                            </Checkbox>
                        </div>
                    </div>
                    <div>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Categories</Typography>
                        </Divider>
                        <Collapse
                            size="large"
                            defaultActiveKey={['0', '1', '2', '3']}
                            items={collapseItems}
                        />
                    </div>
                    <div>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Number of Questions</Typography>
                        </Divider>
                        <div className={styles.radioButtonsWrapper}>
                            <div className={styles.radioWrapper}>
                                <Radio value={'10 questions'} className={styles.radio}>
                                    <Typography className={styles.radioText}>
                                        Classic
                                    </Typography>
                                    <Typography className={styles.radioSubText}>
                                        10 questions
                                    </Typography>
                                </Radio>
                            </div>
                            <div className={styles.radioWrapper}>
                                <Radio value={'5 questions'} className={styles.radio}>
                                    <Typography className={styles.radioText}>
                                        Miniset
                                    </Typography>
                                    <Typography className={styles.radioSubText}>
                                        5 questions
                                    </Typography>
                                </Radio>
                            </div>
                        </div>
                    </div>
                    <div className={styles.configName}>
                        <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                            <Typography className={styles.titleText}>Name</Typography>
                        </Divider>
                        <Input
                            showCount
                            maxLength={20}
                            placeholder={'12345-TEST'}
                            size="large"
                        />
                    </div>
                    <div>
                        <Button
                            color={'primary'}
                            variant={'solid'}
                            size={'large'}
                            style={{ textDecoration: 'none' }}
                            href={'/practice/session/PTG-12345'}
                        >
                            Create!
                        </Button>
                    </div>
                </div>
            </Main>
        </div>
);
}
