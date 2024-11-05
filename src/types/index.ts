
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