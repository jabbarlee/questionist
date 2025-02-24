import React from 'react'

export function Stopwatch({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-stopwatch ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 13a7 7 0 1 0 14 0a7 7 0 0 0 -14 0z" />
            <path d="M14.5 10.5l-2.5 2.5" />
            <path d="M17 8l1 -1" />
            <path d="M14 3h-4" />
        </svg>
    );
}
