// types/guide.ts

// Тип для временной линии
export interface TimeLineData {
    title: string[];
    description: string[];
    topLine: {
        completed: string;
        default: string;
        hover: string;
        pressed: string;
    };
    botLine: {
        completed: string;
        default: string;
        hover: string;
        pressed: string;
    };
    flag: {
        completed: string;
        default: string;
        hover: string;
        pressed: string;
    };
}

// Тип для блока заключения
export interface ConclusionData {
    firstLine: string;
    secondLine: string;
}

// Типы для блоков контента
export type BlockType =
    | 'wide'
    | 'leftTextRightWide'
    | 'rightTextLeftWide'
    | 'leftTextRightSquare'
    | 'rightTextLeftSquare';

export interface BlockData {
    type: BlockType;
    header: string;
    imagePath: string;
    textLines: string[];
    rightLines?: string[];
}

// Тип для страницы гайда
export interface GuidePage {
    pageNumber: number;
    title: string;
    description: string;
    conclusion: ConclusionData;
    blocks: BlockData[];
}

// Главный тип для всего гайда
export interface GuideData {
    guide: {
        mainTitle: string;
        description: string;
        topPicture: string;
        smallBg: string;    // Добавлено новое поле
        bigBg: string;      // Добавлено новое поле
        timeLine: TimeLineData;
        pages: GuidePage[];
    };
}