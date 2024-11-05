export interface TopicsWrapperProps {
    topicsData: { topic: string; subtopics: string[] }[];
    selectedTopicIndex: number;
    selectedSubtopics: string[];
    onTopicSelect: (index: number) => void;
    onSubtopicToggle: (subtopic: string) => void;
}