'use client'

import {useState, useMemo} from 'react';
import styles from './Test.module.scss';
import {TestData, TestQuestionPage} from '@/types/test';
import {useRouter} from 'next/navigation'; // Добавляем импорт роутера

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

export const Test = ({theme = 'adc', page, testData,nextPage}: TestProps) => {
    const router = useRouter(); // Инициализируем роутер
    const currentPageData = useMemo(
        () => testData.testQuestions.find(p => p.pageNumber === page) as TestQuestionPage,
        [page, testData]
    );

    const totalQuestions = currentPageData.questions.length;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(Array(totalQuestions).fill(null));
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [checkedQuestions, setCheckedQuestions] = useState<boolean[]>(Array(totalQuestions).fill(false));

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
        router.back(); // Навигация назад
    };

    const handleTestCompletion = () => {
        const key = theme;
        try {
            const totalPages = testData.testQuestions.length; // Получаем общее количество страниц
            const storedValue = localStorage.getItem(key);

            // Инициализируем массив с правильной длиной
            let completedPages: boolean[] = storedValue
                ? JSON.parse(storedValue)
                : Array(totalPages).fill(false);

            // Корректируем длину массива если необходимо
            if (completedPages.length !== totalPages) {
                completedPages = completedPages.slice(0, totalPages);
                while (completedPages.length < totalPages) {
                    completedPages.push(false);
                }
            }

            // Обновляем текущую страницу
            completedPages[page - 1] = true;
            localStorage.setItem(key, JSON.stringify(completedPages));
        } catch (error) {
            console.error('Ошибка при обновлении localStorage:', error);
        }
        router.push(nextPage);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        setIsAnswerChecked(true);
        // Обновляем массив проверенных вопросов
        setCheckedQuestions(prev => {
            const newChecked = [...prev];
            newChecked[currentQuestionIndex] = true;
            return newChecked;
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswerChecked(false);
        } else {
            handleTestCompletion(); // Вызываем завершение теста
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setAnswers(Array(totalQuestions).fill(null));
        setIsAnswerChecked(false);
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
                                    checkedQuestions[index] ? styles.active : ''
                                }`}
                            />
                            {index < totalQuestions - 1 && (
                                <div
                                    className={`${styles.progressLine} ${
                                        checkedQuestions[index] ? styles.active : ''
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

        </div>
    );
};