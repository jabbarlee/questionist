import React from 'react';
import styles from './index.module.css';

interface ButtonTextWrapperProps {
  children: React.ReactNode;
}

export default function ButtonTextWrapper({ children }: ButtonTextWrapperProps) {
  return (
    <div className={styles.buttonTextWrapper}>
      {children}
    </div>
  );
}
