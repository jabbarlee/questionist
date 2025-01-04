
export type SignInAuthProps = {
    email: string,
    password: string
}

export type SignUpAuthProps = {
    email: string,
    password: string
    fullName: string,
}

export type PracticeStartProps = {
    topics: string[],
    difficulty: string[],
    sessionName: string,
    numberOfQuestions: number
}

interface Option {
    id: string;
    text: string;
}

export type SessionData = {
    createdAt: string;
    difficulty: string[];
    numberOfQuestions: number;
    questions?: QuestionProps[];
    results?: {
        correctAnswers: number;
        incorrectAnswers: number;
        numOfQuestions: number;
        overallScore: number;
        axpGained: number;
        brilliantsGained: number;
    }
    sessionId: string;
    sessionName: string;
    topics: string[];
    favorite: boolean;
};

export type QuestionProps = {
    id: string;
    question: string;
    choices: Option[];
    correctAnswer: string;
    type?: string;
    selectedChoice?: string;
}

export interface SelectedOption {
    questionText: string;
    selectedOptionText: string;
}