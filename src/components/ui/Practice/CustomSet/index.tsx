import React from 'react'
import styles from './index.module.css'
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import headerImage from '@/data/images/customSetImage.png';
import Image from "next/image";

export default function index() {

    return (
        <div className={styles.customSetWrapper}>
            <div className={styles.textWrapper}>
                <Typography className={styles.heading}>Experience the power of crafting</Typography>
                <Typography className={styles.subHeading}>Everything is easy with Questionist, so is the customization</Typography>
            </div>
            <Image alt="Image" src={headerImage} className={styles.image}/>
            <div className={styles.buttonsWrapper}>
                <Button
                    size={'large'}
                    variant='solid'
                    color={'primary'}
                    href={'/practice/create'}
                    style={{ textDecoration: 'none' }}
                >
                    Create one!
                </Button>
                <Button size={'large'} variant='outlined' color={'default'}>How does it work?</Button>
            </div>
        </div>
    )
}
