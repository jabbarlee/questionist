import React from 'react';
import styles from './index.module.css';
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import headerImage from '@/data/images/customSetImage.png';
import Image from "next/image";
import { Card } from '@/components/ui/Card';

export default function CustomSet() {
    return (
        <div>
            <Card
                heading="Experience the power of crafting"
                subHeading="Everything is easy with Questionist, so is the customization.
                        Build the perfect practice set to boost your skills."
                image={headerImage}
                isLarge
            >
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
            </Card>
        </div>
    );
}