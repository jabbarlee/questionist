import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';

interface NavbarLinkProps {
    redirect: string;
    underline?: boolean;
    children: React.ReactNode;
}

export default function NavbarLink({ redirect, underline, children }: NavbarLinkProps) {
    return (
        <Link href={redirect}
              className={underline ? styles.underline : styles.link}
        >
                <>
                    {children}
                </>
        </Link>
    );
}
