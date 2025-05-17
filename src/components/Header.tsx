'use client';

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Header.module.scss';
type Theme = 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';

interface HeaderProps {
    theme?: Theme;
}
export default function Header({ theme = 'all' }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.style.height = isOpen
                ? `${dropdownMenuRef.current.scrollHeight}px`
                : '0';
        }
    }, [isOpen]);

    return (
        <header className={`${styles.header} theme-${theme}`}>`
            <Logo/>
            <div className={`${styles.divider} theme-${theme}`}></div>
            <div
                className={`${styles.dropDown} theme-${theme}`}
                onClick={toggleDropdown}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
        <span className={`${styles.dropDownText} theme-${theme} ${isOpen ? styles.active : ''} `}>
          Руководства
        </span>
                <span className={`${styles.triangle} theme-${theme} ${isOpen ? styles.active : ''}`}></span>
                <div
                    className={`${styles.dropdownMenu} theme-${theme} ${isOpen ? styles.show : ''}`}
                    ref={dropdownMenuRef}
                >
                    <Link href="/guides/all/1" className={`${styles.dropdownItem} theme-${theme}`}>Вводный курс</Link>
                    <Link href="/guides/top/1" className={`${styles.dropdownItem} theme-${theme}`}>Верхняя линия</Link>
                    <Link href="/guides/jungle/1" className={`${styles.dropdownItem} theme-${theme}`}>Лес</Link>
                    <Link href="/guides/mid/1" className={`${styles.dropdownItem} theme-${theme}`}>Средняя линия</Link>
                    <Link href="/guides/adc/1" className={`${styles.dropdownItem} theme-${theme}`}>Стрелок</Link>
                    <Link href="/guides/support/1" className={`${styles.dropdownItem} theme-${theme}`}>Поддержка</Link>
                </div>
            </div>
            <div className={`${styles.divider} theme-${theme}`}></div>
            <nav>
                <Link href="/champions" className={`${styles.navlink} theme-${theme}`}>
                    Чемпионы
                </Link>
            </nav>
        </header>
    );
}