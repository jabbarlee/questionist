import React from "react";
import { Card, Tag } from "antd";
import styles from "./index.module.css";
import practiceSetsData from "@/data/practiceSetsData.json";

const { Meta } = Card;

interface MathCardsProps {
    onCardClick: (title: string, description: string, subTopics: string[], timeLimit: number, questions: number) => void; // Ensure it takes only a string (title)
}

export const MathCards: React.FC<MathCardsProps> = ({ onCardClick }) => {
    return (
        <div className={styles.mathCardsWrapper}>
            {practiceSetsData.map((set, index) => (
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
                    onClick={() => onCardClick(set.title, set.description, set.config.subTopics, set.config.timeLimit, set.config.questions)} // Pass only title to avoid the error
                >
                    <div className={styles.metaDataWrapper}>
                        <Meta title={set.title} description={set.description} className={styles.metaText} />
                        <div className={styles.tagsWrapper}>
                            <Tag color="geekblue">{set.config?.questions || 0} questions</Tag>
                            <Tag color="purple">{set.config?.timeLimit || 0} minutes</Tag>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
