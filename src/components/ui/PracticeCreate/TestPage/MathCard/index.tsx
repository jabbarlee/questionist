import React from 'react';
import { Card } from 'antd';
import styles from './index.module.css';

const { Meta } = Card;

export const MathCard = () => {
    return (
        <div className={styles.mathCardsWrapper}>
            {[
                { title: "Algebra", description: "A practice set that targets algebra" },
                { title: "Geometry and Trigonometry", description: "A practice set that covers geometry and trigonometry concepts" },
                { title: "Problem Solving and Data Analysis", description: "A practice set that targets problem-solving skills and data analysis" },
                { title: "Advanced Math", description: "A practice set that challenges you with advanced mathematical concepts" }
            ].map((set, index) => (
                <Card
                    key={index}
                    className={styles.mathCard}
                    hoverable
                    cover={
                        <img
                            src={`https://api.dicebear.com/9.x/shapes/svg?seed=Caleb${index}`}
                            alt="cover-image"
                            className={styles.coverImage}
                        />
                    }
                >
                    <Meta
                        title={set.title}
                        description={set.description}
                        className={styles.metaText}
                    />
                </Card>
            ))}
        </div>
    );
};
