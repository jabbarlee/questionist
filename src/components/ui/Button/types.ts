export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType: 'primary' | 'secondary' | 'error';
    redirect?: URL | '/';
    fit?: boolean;
}