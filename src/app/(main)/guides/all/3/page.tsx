"use client";

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './page.module.scss';
import adcData from '../../../../../data/json/all.json'
import {ProgressTimeline} from '@/components/guides/ProgressTimeline';
import BlockRenderer from '@/components/guides/BlockRenderer';
import CustomButton from '@/components/guides/Button';
import ScrollToTop from '@/components/ScrollToTop';

import { GuideData } from '@/types/guide';

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null); // Указываем тип
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const pageNumber = 3;

    useEffect(() => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.style.height = isOpen ? `${dropdownMenuRef.current.scrollHeight}px` : '0';
        }
    }, [isOpen]);

    return (
        <main className="mainContainer">
            <div className={styles.upperContainer}>
                <header className={styles.header}>
                    <Logo/>
                    <div className={styles.divider}></div>
                    <div
                        className={styles.dropDown}
                        onClick={toggleDropdown}
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <span className={`${styles.dropDownText} ${isOpen ? styles.active : ''}`}>Руководства</span>
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
                    {/*<div className={styles.imageContainer}>*/}
                    {/*    <Image*/}
                    {/*        src={adcData.guide.topPicture}*/}
                    {/*        alt="Top Guide Picture"*/}
                    {/*        width={815}*/}
                    {/*        height={500}*/}
                    {/*        layout="intrinsic"*/}
                    {/*    />*/}
                    {/*</div>*/}
                </header>
                <main className={styles.main}>
                    <div className={styles.descContainer}>
                        <div className={styles.mainTitle}>
                            {adcData.guide.mainTitle}
                        </div>
                        <div className={styles.mainDescription}>
                            {adcData.guide.description}
                        </div>
                    </div>
                    <div className={styles.timeLineContainer}>
                        <ProgressTimeline
                            timeLine={adcData.guide.timeLine}
                            storageKey={`all`}
                            theme="all"
                            pageHrefs={[
                                '/guides/all/1',
                                '/guides/all/2',
                                '/guides/all/3'
                            ]}
                        />
                    </div>
                    <div className={styles.descContainer}>
                        <div className={styles.mainTitle}>
                            {adcData.guide.pages[pageNumber-1].title}
                        </div>
                        <div className={styles.mainDescription}>
                            {adcData.guide.pages[pageNumber-1].description}
                        </div>
                    </div>
                    <div className={styles.contentContainer}>
                        <BlockRenderer
                            guideData={adcData as unknown as GuideData}
                            pageNumber={pageNumber}
                            theme="all"
                        />
                    </div>
                    <div className={styles.conclusionContainer}>
                        <p className={styles.firstLine}>{adcData.guide.pages[pageNumber-1].conclusion.firstLine}</p>
                        <p className={styles.secondLine}>{adcData.guide.pages[pageNumber-1].conclusion.secondLine}</p>

                    </div>
                    <div className={styles.lastBlock}>
                        <div className={styles.leftBlock}>
                            <p className={styles.buttonText}>Пройди тест, чтобы закрепить материал!</p>
                            <CustomButton href={"/guides/all/3/test"} theme="all">
                                Начать тест
                            </CustomButton>
                        </div>
                    </div>

                </main>
            </div>
            <ScrollToTop theme={'all'}/>
        </main>
    );
}