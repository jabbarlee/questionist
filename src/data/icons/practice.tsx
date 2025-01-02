import React from "react";

export function Potion({ className, ...props }: { className?: string }) {
    return (
        <div className={className} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icon-tabler-outline icon-tabler-flask-2"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.1 15h11.8" />
                <path d="M14 3v7.342a6 6 0 0 1 1.318 10.658h-6.635a6 6 0 0 1 1.317 -10.66v-7.34h4z" />
                <path d="M9 3h6" />
            </svg>
        </div>
    );
}

export function Bolt({ className, ...props }: { className?: string }) {
    return (
        <div className={className} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icon-tabler-outline icon-tabler-bolt"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
            </svg>
        </div>
    );
}

export function Fire({ className, ...props }: { className?: string }) {
    return (
        <div className={className} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className="icon icon-tabler icon-tabler-filled icon-tabler-flame"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78"
                />
            </svg>
        </div>
    );
}