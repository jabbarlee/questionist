import React from 'react';
import styles from './index.module.css';

export default function SessionsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}
