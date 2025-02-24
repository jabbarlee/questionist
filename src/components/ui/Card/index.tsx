import React from "react";
import styles from "./index.module.css";
import Typography from "@mui/material/Typography";
import { Tag } from 'antd'
import Image, { StaticImageData } from 'next/image';

export const Card = ({
    title,
    specialTitle,
    icon,
    heading,
    subHeading,
    image,
    variant,
    isLarge,
    onClick,
    children,
}: {
    title?: string;
    specialTitle?: string;
    icon?: React.ReactNode;
    heading: string;
    subHeading?: string;
    image?: StaticImageData;
    variant?: "premium" | "secondary";
    isLarge?: boolean;
    onClick?: () => {};
    children: React.ReactNode;
}) => {

  return (
    <div className={`${styles.card} ${isLarge ? styles.large : ''} ${variant ? styles[variant] : ''}`}>
        <div className={styles.contentWrapper}>
            <div className={styles.textWrapper}>
                {(title || specialTitle) && (
                    <div className={styles.titleWrapper}>
                        {specialTitle && (
                            <>
                                <Tag color="gold">{specialTitle}</Tag>
                            </>
                        )}
                        {title && <Typography className={styles.title} fontSize={'14px'}>{title}</Typography>}
                    </div>
                )}
                <div className={styles.headingWrapper}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    <Typography className={styles.heading} fontSize={isLarge ? '28px' : '24px'}>
                        {heading}
                    </Typography>
                </div>
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
  );
};
