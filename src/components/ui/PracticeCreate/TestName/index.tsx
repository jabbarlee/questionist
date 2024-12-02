import React from 'react'
import styles from './index.module.css'
import {Checkbox, Divider, Input} from "antd";
import Typography from "@mui/material/Typography";
import { questionTypes } from "@/data/configData";

export default function index({
    testName,
    setTestName
}: {
    testName: string | null,
    setTestName:  React.Dispatch<React.SetStateAction<string | null>>
}) {
    return (
        <div className={styles.configName}>
            <Divider orientation="left" style={{margin: '0'}} orientationMargin="0">
                <Typography className={styles.titleText}>Name</Typography>
            </Divider>
            <Input
                showCount
                maxLength={20}
                placeholder={'12345-TEST'}
                size="large"
                value={testName || ''}
                onChange={(e) => setTestName(e.target.value)}
            />
        </div>
    )
}
