import { generatePracticeSessionId } from "./generatePracticeSessionId"

export const handlePracticeStart = async ({
    selectedSubtopics,
    calculatorOption,
    difficultyOption,
    router
} : {
    selectedSubtopics: string[],
    calculatorOption: string,
    difficultyOption: string,
    router: any
}) => {
    const practiceSessionId = generatePracticeSessionId();
    router.push(`/practice/${practiceSessionId}`);
}