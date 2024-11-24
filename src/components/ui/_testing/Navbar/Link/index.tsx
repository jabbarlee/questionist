import React from 'react';
import Link from 'next/link';

interface NavbarLinkProps {
    redirect: string;
    underline?: boolean;
    children: React.ReactNode;
}

export default function NavbarLink({ redirect, underline, children }: NavbarLinkProps) {
    return (
        <Link href={redirect}>
            <a style={{
                textDecoration: underline ? 'underline' : 'none',
                color: '#595959',
                fontSize: '16px',
                padding: '5px 10px',
                display: 'block',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                {children}
            </a>
        </Link>
    );
}
