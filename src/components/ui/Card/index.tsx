import React from "react";
import styles from "./index.module.css";
import Typography from "@mui/material/Typography";
import Image, { StaticImageData } from 'next/image';

export const Card = ({
    title,
    heading,
    subHeading,
    image,
    isLarge,
    children
}: {
    title?: string;
    heading: string;
    subHeading?: string;
    image?: StaticImageData;
    isLarge?: boolean;
    children: React.ReactNode;
}) => {

  return (
    <div className={styles.cardWrapper}>
        <div className={styles.card + (isLarge ? ' ' + styles.large : '')}>
            <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                    {title && <Typography className={styles.title} fontSize={'16px'}>{title}</Typography>}
                    <Typography className={styles.heading} fontSize={isLarge ? '28px' : '24px'}>{heading}</Typography>
                    {subHeading && <Typography className={styles.subHeading} fontSize={'16px'}>{subHeading}</Typography>}
                </div>
                <div>
                    {children}
                </div>
            </div>
            {image && (
                <div className={styles.imageWrapper}>
                    {image && <Image src={image} alt={heading} width={isLarge ? 400 : 200} height={isLarge ? 400 : 200} />}
                </div>
            )}
        </div>
    </div>
  );
};
