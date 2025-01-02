import React from 'react'
import styles from './index.module.css'
import { Checkbox, Divider } from "antd";
import Typography from "@mui/material/Typography";
import { questionTypes } from "@/data/configData";

export default function index({
    questionType,
    setQuestionType
}: {
    questionType: string[] | null,
    setQuestionType: React.Dispatch<React.SetStateAction<string[] | null>>
}) {
    return (
        <div className={styles.configQuestionType}>
            <Typography className={styles.titleText}>Question Type</Typography>
            <div className={styles.questionTypeWrapper}>
                <div>
                    {questionTypes.map((question, index) => (
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setQuestionType([...(questionType || []), question.type]);
                                } else {
                                    setQuestionType(questionType?.filter(d => d !== question.type) || []);
                                }
                            }}
                            key={index}
                        >
                            <Typography className={styles.radioText}>{question.type}</Typography>
                            <Typography className={styles.radioSubText}>
                                {question.description}
                            </Typography>
                        </Checkbox>
                    ))}
                </div>
            </div>
        </div>
    )
}
