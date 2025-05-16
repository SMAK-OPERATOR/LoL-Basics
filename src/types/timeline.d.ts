export interface TimelineElement {
    completed: string;
    default: string;
    hover: string;
    pressed: string;
}

export interface GuideTimeLine {
    title: string[];
    description: string[];
    topLine: TimelineElement;
    botLine: TimelineElement;
    flag: TimelineElement;
}

export interface GuideData {
    mainTitle: string;
    description: string;
    topPicture: string;
    timeLine: GuideTimeLine;
}