"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.scss';

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsActive(false); // Сбрасываем активное состояние при уходе мыши
    };

    const handleMouseDown = () => {
        setIsActive(true);
    };

    const handleMouseUp = () => {
        setIsActive(false);
    };

    const logoSrc = isActive
        ? '/images/logo3.svg'
        : isHovered
            ? '/images/logo2.svg'
            : '/images/logo1.svg';

    return (
        <Link href="/" passHref>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ cursor: 'pointer' }}
            >
                <Image
                    src={logoSrc}
                    alt="Логотип"
                    width={245}
                    height={40}
                    className={styles.logoImage}
                />
            </div>
        </Link>
    );
};

export default Logo;