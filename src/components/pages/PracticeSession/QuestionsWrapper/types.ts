export interface QuestionData {
    type: 'multiple-choice' | 'open';
    question: string;
    choices?: string[];
}  

export type PracticeSessionProps = {
    sessionId: string
}