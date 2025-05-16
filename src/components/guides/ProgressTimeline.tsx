'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProgressTimeline.module.scss';
import { GuideTimeLine } from '@/types/timeline';
import { TimelineElement } from "@/types/timeline";

interface ProgressTimelineProps {
    timeLine: GuideTimeLine;
    storageKey: string;
    theme: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';
    pageHrefs: string[]; // Новый пропс для URL страниц
}

export const ProgressTimeline = ({ timeLine, storageKey, theme, pageHrefs }: ProgressTimelineProps) => {
    const [completedStates, setCompletedStates] = useState<boolean[]>([false, false, false]);
    const [hoverStates, setHoverStates] = useState<boolean[]>([false, false, false]);
    const [pressedStates, setPressedStates] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) setCompletedStates(JSON.parse(saved));
    }, [storageKey]);

    const handleState = (index: number, state: 'hover' | 'press', value: boolean) => {
        const setter = state === 'hover' ? setHoverStates : setPressedStates;
        setter(prev => prev.map((v, i) => i === index ? value : v));
    };

    const elements = [
        {
            type: 'topLine',
            index: 0,
            width: 345,
            height: 115,
            offset: 0,
            top: 0
        },
        {
            type: 'botLine',
            index: 1,
            width: 345,
            height: 115,
            offset: -6,
            top: 95
        },
        {
            type: 'flag',
            index: 2,
            width: 380,
            height: 115,
            offset: -6,
            top: -2
        },
    ] as const;

    return (
        <div className={`${styles.container} theme-${theme}`}>
            {elements.map(({ type, index, width, height, offset, top }) => {
                const isCompleted = completedStates[index];
                const isHovered = hoverStates[index];
                const isPressed = pressedStates[index];

                let state: keyof TimelineElement = 'default';
                if (isPressed) state = 'pressed';
                else if (isHovered) state = 'hover';
                else if (isCompleted) state = 'completed';

                return (
                    <Link
                        key={type}
                        href={pageHrefs[index]}
                        className={styles.item}
                        style={{
                            marginLeft: `${offset}px`,
                            marginTop: `${top}px`,
                            zIndex: 10 + index
                        }}
                        onMouseEnter={() => handleState(index, 'hover', true)}
                        onMouseLeave={() => handleState(index, 'hover', false)}
                        onMouseDown={() => handleState(index, 'press', true)}
                        onMouseUp={() => handleState(index, 'press', false)}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={timeLine[type][state]}
                                alt=""
                                width={width}
                                height={height}
                                className={styles.image}
                            />
                            <div className={styles.textOverlay} style={{
                                marginTop: type === 'botLine' ? '1.5rem' : '-1rem',
                                marginLeft: '5.2rem',
                                top: '1.45rem',
                                left: '1.875rem',
                                width: 'calc(100% - 60px)'
                            }}>
                                <p className={`
                                    ${styles.title} 
                                    ${isHovered ? styles.hover : ''} 
                                    ${isPressed ? styles.pressed : ''}
                                `}>
                                    {timeLine.title[index]}
                                </p>
                                <p className={styles.description}>{timeLine.description[index]}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};