"use client";

import Link from 'next/link';
import styles from './Logo.module.scss';

type Theme = 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';

interface LogoProps {
    theme?: Theme;
}

const Logo = ({ theme = 'all' }: LogoProps) => {
    return (
        <Link href="/" passHref>
            <div
                className={`${styles.logoContainer} theme-${theme}`}
                style={{ cursor: 'pointer' }}
            >
                <div className={styles.logoText}>
                    LoL Basics
                </div>
            </div>
        </Link>
    );
};

export default Logo;