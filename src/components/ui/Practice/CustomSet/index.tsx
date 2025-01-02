import React from 'react';
import styles from './index.module.css';
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import headerImage from '@/data/images/customSetImage.png';
import Image from "next/image";

export default function CustomSet() {
    return (
        <div className={styles.customSetWrapper}>
            <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                    <Typography className={styles.heading}>Experience the power of crafting</Typography>
                    <Typography className={styles.subHeading}>
                        Everything is easy with Questionist, so is the customization.
                        Build the perfect practice set to boost your skills.
                    </Typography>
                </div>
                <div className={styles.buttonsWrapper}>
                    <Button
                        size="large"
                        type="primary"
                        href="/practice/create"
                        style={{ textDecoration: 'none', width: '50%' }}
                    >
                        Create one!
                    </Button>
                    <Button
                        size="large"
                        type="default"
                        style={{ width: '50%' }}
                    >
                        How does it work?
                    </Button>
                </div>
            </div>
            <div className={styles.imageWrapper}>
                <Image
                    alt="Illustration"
                    src={headerImage}
                    className={styles.image}
                    priority
                />
            </div>
        </div>
    );
}