
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
}

export type Question = {
    question: string;
    choices?: string[];
    correctAnswer: string;
    type: string;
};
