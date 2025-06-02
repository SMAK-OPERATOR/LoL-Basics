"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsActive(false);
    };
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const textColor = isActive ? '#BD8C2A' : '#FAC356'; // Красный при нажатии, иначе черный
    const textShadow = isHovered ? '0 0 25px rgba(250, 195, 86, 1)' : 'none'; // Синяя тень при наведении

    return (
        <Link href="/" passHref>
            <div
                className={styles.logoContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ cursor: 'pointer' }}
            >
                <div
                    className={styles.logoText}
                    style={{
                        color: textColor,
                        textShadow: textShadow
                    }}
                >
                    LoL Basics
                </div>
            </div>
        </Link>
    );
};

export default Logo;