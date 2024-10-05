import React from 'react';
import styles from './index.module.css'; 
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType: 'primary' | 'secondary';
    redirect?: Url | '/';
}
  
const Button = ({ children, buttonType, redirect, ...props } : ButtonProps) => {

    const buttonClass = buttonType === 'primary' ? styles.btnPrimary : styles.btnSecondary;

    return (
        <button className={buttonClass} {...props}>
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