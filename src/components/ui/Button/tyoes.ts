export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType: 'primary' | 'secondary' | 'error';
    redirect?: Url | '/';
    fit?: boolean;
}