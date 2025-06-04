'use client'
import {useState, useMemo} from 'react';
import styles from './Test.module.scss';
import {TestData, TestQuestionPage} from '@/types/test';
import {useRouter} from 'next/navigation';

interface TestProps {
    theme?: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';
    page: number;
    testData: TestData;
    nextPage: string;
}

const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <line x1="0" y1="0" x2="24" y2="24" stroke="currentColor" strokeWidth="2"/>
        <line x1="0" y1="24" x2="24" y2="0" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const RestartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            fill="currentColor"/>
    </svg>
);

export const Test = ({theme = 'adc', page, testData, nextPage}: TestProps) => {
    const router = useRouter();
    const currentPageData = useMemo(
        () => testData.testQuestions.find(p => p.pageNumber === page) as TestQuestionPage,
        [page, testData]
    );

    const totalQuestions = currentPageData.questions.length;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [questionStatuses, setQuestionStatuses] = useState<('unanswered' | 'correct' | 'incorrect')[]>(
        Array(totalQuestions).fill('unanswered')
    );
    const [showModal, setShowModal] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const currentQuestion = currentPageData.questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleOptionSelect = (optionIndex: number) => {
        if (!isAnswerChecked) {
            const newAnswers = [...answers];
            newAnswers[currentQuestionIndex] = optionIndex;
            setAnswers(newAnswers);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const saveResults = () => {
        const key = theme;
        try {
            const totalPages = testData.testQuestions.length;
            const storedValue = localStorage.getItem(key);
            let completedPages: boolean[] = storedValue
                ? JSON.parse(storedValue)
                : Array(totalPages).fill(false);

            if (completedPages.length !== totalPages) {
                completedPages = completedPages.slice(0, totalPages);
                while (completedPages.length < totalPages) {
                    completedPages.push(false);
                }
            }

            completedPages[page - 1] = true;
            localStorage.setItem(key, JSON.stringify(completedPages));
        } catch (error) {
            console.error('Ошибка при обновлении localStorage:', error);
        }

        const resultsKey = `${theme}Test`;
        try {
            const arraySize = theme === 'jungle' ? 4 : 3;
            const storedResults = localStorage.getItem(resultsKey);
            let results: number[] = storedResults
                ? JSON.parse(storedResults)
                : Array(arraySize).fill(0);

            if (results.length !== arraySize) {
                const newResults = Array(arraySize).fill(0);
                for (let i = 0; i < Math.min(results.length, arraySize); i++) {
                    newResults[i] = results[i];
                }
                results = newResults;
            }

            const correctCount = questionStatuses.filter(
                status => status === 'correct'
            ).length;

            const currentPageIndex = page - 1;
            if (correctCount > results[currentPageIndex]) {
                results[currentPageIndex] = correctCount;
                localStorage.setItem(resultsKey, JSON.stringify(results));
            }
        } catch (error) {
            console.error('Ошибка при сохранении результатов теста:', error);
        }
    };

    const completeTest = () => {
        saveResults();

        const correctCount = questionStatuses.filter(
            status => status === 'correct'
        ).length;

        setCorrectAnswersCount(correctCount);
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        const isCorrect = selectedAnswer === currentQuestion.correctIndex;

        setQuestionStatuses(prev => {
            const newStatuses = [...prev];
            newStatuses[currentQuestionIndex] = isCorrect ? 'correct' : 'incorrect';
            return newStatuses;
        });

        setIsAnswerChecked(true);
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswerChecked(false);
        } else {
            completeTest();
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setAnswers(Array(totalQuestions).fill(null));
        setIsAnswerChecked(false);
        setQuestionStatuses(Array(totalQuestions).fill('unanswered'));
        setShowModal(false);
    };

    const handleContinue = () => {
        setShowModal(false);
        router.push(nextPage);
    };

    return (
        <div className={`${styles.testContainer} theme-${theme}`}>
            <div className={styles.header}>
                <button className={styles.iconButton} onClick={handleBack}>
                    <BackIcon/>
                </button>

                <div className={styles.progressBar}>
                    {currentPageData.questions.map((_, index) => (
                        <div key={index} className={styles.progressStep}>
                            <div
                                className={`${styles.progressDot} ${
                                    questionStatuses[index] === 'correct'
                                        ? styles.correct
                                        : questionStatuses[index] === 'incorrect'
                                            ? styles.incorrect
                                            : ''
                                }`}
                            />
                            {index < totalQuestions - 1 && (
                                <div
                                    className={`${styles.progressLine} ${
                                        questionStatuses[index] === 'correct'
                                            ? styles.correct
                                            : questionStatuses[index] === 'incorrect'
                                                ? styles.incorrect
                                                : ''
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.counter}>
                    {currentQuestionIndex + 1}/{totalQuestions}
                </div>

                <button className={styles.iconButtonRight} onClick={handleRestart}>
                    <RestartIcon/>
                </button>
            </div>
            <p className={styles.questionText}>{currentQuestion.question}</p>
            <div className={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctIndex;
                    const isSelected = selectedAnswer === index;
                    let optionState = '';

                    if (isAnswerChecked) {
                        if (isCorrect) optionState = styles.correct;
                        else if (isSelected) optionState = styles.incorrect;
                    }

                    return (
                        <button
                            key={index}
                            className={`${styles.option} 
                                ${isSelected ? styles.selected : ''} 
                                ${optionState}`}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswerChecked}
                        >
                            <span className={styles.optionNumber}>{index + 1}.</span>
                            <span className={styles.optionText}>{option}</span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.actionContainer}>
                <button
                    className={`${styles.button} ${isAnswerChecked ? styles.nextButton : ''}`}
                    onClick={isAnswerChecked ? handleNext : handleSubmit}
                    disabled={!isAnswerChecked && selectedAnswer === null}
                >
                    <span className={styles.text}>
                        {isAnswerChecked
                            ? (isLastQuestion ? 'Завершить тест' : 'Следующий вопрос')
                            : 'Проверить ответ'}
                    </span>
                </button>

                {isAnswerChecked && (
                    <div className={styles.explanation}>
                        {currentQuestion.explanation}
                    </div>
                )}
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Тест завершен!</h2>
                        <p>Ваш результат: {correctAnswersCount} из {totalQuestions}</p>

                        <div className={styles.modalButtons}>
                            <button
                                className={`${styles.button} ${styles.modalButton}`}
                                onClick={handleRestart}
                            >
                                <span className={styles.text}>
                                    Пройти снова
                                </span>
                            </button>

                            <button
                                className={`${styles.button} ${styles.modalButton}`}
                                onClick={handleContinue}
                            >
                                <span className={styles.text}>
                                    Продолжить
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};