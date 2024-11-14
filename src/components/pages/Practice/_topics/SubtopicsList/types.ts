export interface SubtopicsListProps {
    subtopics: string[];
    selectedSubtopics: string[];
    onToggle: (subtopic: string) => void;
}