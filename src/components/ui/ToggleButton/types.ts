export interface ToggleButtonProps {
    options: string[];
    value: string;
    onChange: (selectedOption: string) => void;
}