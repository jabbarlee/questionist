export interface QuestionChipProps {
    type: 'multiple-choice' | 'open',
    question: string,
    choices?: string[],
    selectedChoice?: string | null;
    onSelectChoice?: (choice: string) => void; 
    questionIndex: number;
    correctChoice?: boolean | null;
}

export type QuestionResultProps = {
    correctChoice?: boolean | null,
    question: string
}

export type QuestionChoiceProps = {
    choice: string,
    selectedChoice?: string | null,
    onSelectChoice?: (choice: string) => void,
    questionIndex: number,
    correctChoice?: boolean | null
}