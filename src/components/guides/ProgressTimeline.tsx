'use client';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProgressTimeline.module.scss';
import { GuideTimeLine } from '@/types/timeline';
import { TimelineElement } from "@/types/timeline";

interface ProgressTimelineProps {
    timeLine: GuideTimeLine;
    storageKey: string;
    theme: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';
    pageHrefs: string[];
}

export const ProgressTimeline = ({ timeLine, storageKey, theme, pageHrefs }: ProgressTimelineProps) => {
    const elements = useMemo(() => {
        if (theme === 'jungle') {
            return [
                {
                    type: 'topLine' as const,
                    index: 0,
                    width: 345,
                    height: 115,
                    offset: 0,
                    top: 0,
                    uid: 'topLine-1'
                },
                {
                    type: 'botLine' as const,
                    index: 1,
                    width: 345,
                    height: 115,
                    offset: -6,
                    top: 95,
                    uid: 'botLine'
                },
                {
                    type: 'topLine' as const,
                    index: 2,
                    width: 345,
                    height: 115,
                    offset: -6,
                    top: 0,
                    uid: 'topLine-2'
                },
                {
                    type: 'flag' as const,
                    index: 3,
                    width: 380,
                    height: 175,
                    offset: -6,
                    top: 39,
                    uid: 'flag'
                },
            ];
        } else {
            return [
                {
                    type: 'topLine' as const,
                    index: 0,
                    width: 345,
                    height: 115,
                    offset: 0,
                    top: 0,
                    uid: 'topLine'
                },
                {
                    type: 'botLine' as const,
                    index: 1,
                    width: 345,
                    height: 115,
                    offset: -6,
                    top: 95,
                    uid: 'botLine'
                },
                {
                    type: 'flag' as const,
                    index: 2,
                    width: 380,
                    height: 115,
                    offset: -6,
                    top: -2,
                    uid: 'flag'
                },
            ];
        }
    }, [theme]);

    const [completedStates, setCompletedStates] = useState<boolean[]>([]);
    const [hoverStates, setHoverStates] = useState<boolean[]>([]);
    const [pressedStates, setPressedStates] = useState<boolean[]>([]);

    useEffect(() => {
        const isClient = typeof window !== 'undefined';
        if (!isClient) return;

        try {
            const saved = localStorage.getItem(storageKey);
            const initialCompleted = saved
                ? JSON.parse(saved).slice(0, elements.length)
                : Array(elements.length).fill(false);

            setCompletedStates(initialCompleted);
            setHoverStates(Array(elements.length).fill(false));
            setPressedStates(Array(elements.length).fill(false));
        } catch (e) {
            console.error('Error loading progress:', e);
            setCompletedStates(Array(elements.length).fill(false));
        }
    }, [elements.length, storageKey]);

    useEffect(() => {
        if (typeof window !== 'undefined' && completedStates.length > 0) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(completedStates));
            } catch (e) {
                console.error('Error saving progress:', e);
            }
        }
    }, [completedStates, storageKey]);

    const handleState = (index: number, state: 'hover' | 'press', value: boolean) => {
        const setter = state === 'hover' ? setHoverStates : setPressedStates;
        setter(prev => prev.map((v, i) => i === index ? value : v));
    };

    return (
        <div className={`${styles.container} theme-${theme}`}>
            {elements.map(({ type, index, width, height, offset, top, uid }) => {
                const isCompleted = completedStates[index];
                const isHovered = hoverStates[index];
                const isPressed = pressedStates[index];

                let state: keyof TimelineElement = 'default';
                if (isPressed) state = 'pressed';
                else if (isHovered) state = 'hover';
                else if (isCompleted) state = 'completed';

                return (
                    <Link
                        key={uid}
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
                                marginTop:
                                    theme === 'jungle' && type === 'flag'
                                        ? '5rem'
                                        : type === 'botLine'
                                            ? '1.5rem'
                                            : '-1rem',
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