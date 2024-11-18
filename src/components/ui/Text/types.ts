import React from 'react'

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>{
    children: React.ReactNode,
    error?: boolean,
    success?: boolean,
    heading?: boolean,
    subheading?: boolean,
    link?: string,
    smaller?: boolean,
    italic?: boolean,
}