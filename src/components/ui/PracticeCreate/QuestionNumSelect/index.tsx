import React from 'react'
import styles from './index.module.css'
import { Divider, Radio} from "antd";
import Typography from "@mui/material/Typography";

export default function index({
  numberOfQuestions,
  setNumberOfQuestions
}: {
    numberOfQuestions: number | null,
    setNumberOfQuestions: React.Dispatch<React.SetStateAction<number | null>>
}) {

    return (
        <>
            <Typography className={styles.titleText}>Number of Questions</Typography>
            <div className={styles.radioButtonsWrapper}>
                <div className={styles.radioWrapper}>
                    <Radio
                        value={10}
                        className={styles.radio}
                        checked={numberOfQuestions === 10}
                        onChange={() => setNumberOfQuestions(10)}
                    >
                        <Typography className={styles.radioText}>
                            Classic
                        </Typography>
                        <Typography className={styles.radioSubText}>
                            10 questions
                        </Typography>
                    </Radio>
                </div>
                <div className={styles.radioWrapper}>
                    <Radio
                        value={5}
                        className={styles.radio}
                        checked={numberOfQuestions === 5}
                        onChange={() => setNumberOfQuestions(5)}
                    >
                        <Typography className={styles.radioText}>
                            Miniset
                        </Typography>
                        <Typography className={styles.radioSubText}>
                            5 questions
                        </Typography>
                    </Radio>
                </div>
            </div>
        </>
    )
}