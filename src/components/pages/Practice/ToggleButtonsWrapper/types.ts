export interface ToggleButtonsWrapperProps {
    calculatorOption: string;
    difficultyOption: string;
    onCalculatorChange: (option: string) => void;
    onDifficultyChange: (option: string) => void;
}