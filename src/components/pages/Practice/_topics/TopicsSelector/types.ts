export interface TopicsSelectorProps {
    topics: string[];
    selectedTopicIndex: number;
    onSelect: (index: number) => void;
}