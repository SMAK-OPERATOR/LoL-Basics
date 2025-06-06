'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';
type Theme = 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';

interface ScrollToTopProps {
    theme?: Theme;
}
export default function ScrollToTop({ theme = 'all' }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 200);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            className={`${styles.scrollButton} theme-${theme}`}
            onClick={scrollToTop}
            aria-label="Вернуться к началу"
        >
            <svg className={`${styles.arrow} theme-${theme}`} viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
        </button>
    );
}