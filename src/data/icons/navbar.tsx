import React from 'react';

export function Function({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-math-function ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 19a2 2 0 0 0 2 2c2 0 2 -4 3 -9s1 -9 3 -9a2 2 0 0 1 2 2" />
            <path d="M5 12h6" />
            <path d="M15 12l6 6" />
            <path d="M15 18l6 -6" />
        </svg>
    );
}

export function Dashboard({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        </svg>
    );
}

export function Reward({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-award ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
            <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
            <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
        </svg>
    );
}

export function Arrow({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-bow ${className}`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 3h4v4" />
            <path d="M21 3l-15 15" />
            <path d="M3 18h3v3" />
            <path d="M16.5 20c1.576 -1.576 2.5 -4.095 2.5 -6.5c0 -4.81 -3.69 -8.5 -8.5 -8.5c-2.415 0 -4.922 .913 -6.5 2.5l12.5 12.5z" />
        </svg>
    );
}

export function Report({ className, ...props }: { className?: string }) {
    return (
        <div className={className} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icon-tabler-outline icon-tabler-report-analytics"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M9 17v-5" />
                <path d="M12 17v-1" />
                <path d="M15 17v-3" />
            </svg>
        </div>
    );
}
