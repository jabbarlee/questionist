
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

export interface QuestionProps {
    questionText: string;
    options: Option[];
    correctAnswer: string;
}

export type SessionData = {
    createdAt: string;
    difficulty: string[];
    numberOfQuestions: number;
    sessionId: string;
    sessionName: string;
    topics: string[];
};
