
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

export type Question = {
    question: string;
    choices?: string[];
    correctAnswer: string;
    type: string;
};
