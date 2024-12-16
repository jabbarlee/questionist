
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
    }
    sessionId: string;
    sessionName: string;
    topics: string[];
};

export type QuestionProps = {
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