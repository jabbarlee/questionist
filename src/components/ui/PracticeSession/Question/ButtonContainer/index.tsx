import React from "react";
import {Button} from "antd"
import styles from "./index.module.css";
import {ThunderboltOutlined} from "@ant-design/icons";

export const ButtonContainer = (
    {
        result
    }:{
        result: boolean
    }) => {
    return (
        <div className={styles.buttonContainer}>
            <div className={styles.buttons}>
                <Button variant='dashed' color='default'>
                    Hold to reveal answer
                </Button>
                <Button variant='solid' color='primary'>
                    <ThunderboltOutlined style={{ fontSize: '15px' }}/>
                    AI Analysis
                </Button>
            </div>
        </div>
    );
};