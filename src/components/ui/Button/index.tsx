import React from 'react';
import styles from './index.module.css'; 
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType: 'primary' | 'secondary';
    redirect?: Url | '/';
    fit?: boolean;
}
  
const Button = ({ children, buttonType, redirect, ...props } : ButtonProps) => {

    const buttonClass = buttonType === 'primary' ? styles.btnPrimary : styles.btnSecondary;

    return (
        <button 
            className={buttonClass} 
            style={{ 
                width: props.fit ? 'calc(100% + 16px)' : 'auto',
            }} 
            {...props} 
        >            {redirect ? (
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
