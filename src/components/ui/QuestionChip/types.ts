export interface QuestionChip {
    type: 'multiple-choice' | 'open',
    question: string,
    choices?: string[],
    selectedChoice?: string | null;
    onSelectChoice: (choice: string) => void; 
    questionIndex: number;
}