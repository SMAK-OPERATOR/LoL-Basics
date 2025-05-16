export interface TestQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface TestQuestionPage {
    pageNumber: number;
    questions: TestQuestion[];
}

export interface TestData {
    testQuestions: TestQuestionPage[];
}