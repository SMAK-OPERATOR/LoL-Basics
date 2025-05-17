'use client';

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Header.module.scss';

export default function Header() {
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
        <header className={styles.header}>
            <Logo/>
            <div className={styles.divider}></div>
            <div
                className={styles.dropDown}
                onClick={toggleDropdown}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
        <span className={`${styles.dropDownText} ${isOpen ? styles.active : ''}`}>
          Руководства
        </span>
                <span className={`${styles.triangle} ${isOpen ? styles.active : ''}`}></span>
                <div
                    className={`${styles.dropdownMenu} ${isOpen ? styles.show : ''}`}
                    ref={dropdownMenuRef}
                >
                    <Link href="/guides/all/1" className={styles.dropdownItem}>Вводный курс</Link>
                    <Link href="/guides/top/1" className={styles.dropdownItem}>Верхняя линия</Link>
                    <Link href="/guides/jungle/1" className={styles.dropdownItem}>Лес</Link>
                    <Link href="/guides/mid/1" className={styles.dropdownItem}>Средняя линия</Link>
                    <Link href="/guides/adc/1" className={styles.dropdownItem}>Стрелок</Link>
                    <Link href="/guides/support/1" className={styles.dropdownItem}>Поддержка</Link>
                </div>
            </div>
            <div className={styles.divider}></div>
            <nav>
                <Link href="/champions" className={styles.navlink}>
                    Чемпионы
                </Link>
            </nav>
        </header>
    );
}