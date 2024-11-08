export interface QuestionData {
    question: string;
    choices?: string[];
    correctAnswer: string;
    type: 'multiple-choice' | 'open';
}  

export type PracticeSessionProps = {
    sessionId: string
}