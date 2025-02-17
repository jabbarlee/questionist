
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

export type UserData = {
    axp?: number;
    axpToNextLevel?: number;
    brilliants?: number;
    createdAt: string;
    email: string;
    level?: number;
    name: string;
    progressToNextLevel?: number;
    role: "student" | "admin" | "teacher";
    uid: string;
};

export type ContractProps = {
    title: string;
    description: string;
    type: string;
    difficulty: string;
    topics: string[];
    totalTasks: number;
    timeLimit: number;
    rewards: {
        axp: number;
        brilliants: number;
        badge: string;
    };
}