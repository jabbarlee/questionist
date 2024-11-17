export interface QuestionChipProps {
    type: 'multiple-choice' | 'open',
    question: string,
    choices?: string[],
    selectedChoice?: string | null;
    onSelectChoice?: (choice: string) => void; 
    questionIndex: number;
    correctAnswer?: string | null;
}

export type QuestionResultProps = {
    correctChoice?: string | null,
    selectedChoice?: string | null,
    question: string
}

export type QuestionChoiceProps = {
    choice: string,
    selectedChoice?: string | null,
    onSelectChoice?: (choice: string) => void,
    questionIndex: number,
    correctChoice?: string | null
}