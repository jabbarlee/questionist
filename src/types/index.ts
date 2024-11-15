
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
    selectedSubtopics: string[],
    calculatorOption: string,
    difficultyOption: string,
    router: any
}

export type Question = {
    question: string;
    choices?: string[];
    correctAnswer: string;
    type: string;
};