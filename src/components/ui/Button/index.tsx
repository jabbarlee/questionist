import React from 'react';
import styles from './index.module.css'; 
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { ButtonProps } from './types';
  
const Button = ({ children, buttonType, redirect, fit, ...props } : ButtonProps) => {
    const buttonClass = `${buttonType === 'primary' ? styles.btnPrimary : buttonType === 'secondary' ? styles.btnSecondary : buttonType === 'error' ? styles.btnError : ''} ${fit ? styles.btnFit : ''}`;

    return (
        <button 
            className={buttonClass} 
            {...props}
        >
            {redirect ? (
                <Link 
                    href={redirect}
                    className={styles.btnLink} 
                    style={{ color: buttonType === 'primary' ? 'black' : 'white' }}
                >
                    {children}
                </Link>
            ) : (
                <>{children}</>
            )}
        </button>
    );
};

export default Button;