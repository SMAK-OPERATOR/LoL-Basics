"use client";

import Link from 'next/link'
import Logo from '@/components/Logo';
import styles from './page.module.scss';
import GuideCard from '@/components/main/GuideCard';
import ImageDisplay from '@/components/main/ImageDisplay';
import {useState} from "react";


export default function Home() {
    const [imageSrc, setImageSrc] = useState<string>('/images/main/all.png'); // Начальное изображение
    return (
        <main className="mainContainer">
            <div className={styles.upperContainer}>
                <div className={styles.leftContainer}>
                    <header className={styles.header}>
                        <Logo />
                        <div className={styles.divider}></div>
                        <nav>
                            <Link href="champions" className={styles.navlink}>
                                Чемпионы
                            </Link>
                        </nav>
                    </header>
                    <div className={styles.textblock}>
                        <p className={styles.mainTitle}>Открой для себя секреты победы вместе с LoL Basics!</p>
                        <div className={styles.subTitleDiv}>
                            <p className={styles.subtitle}>Выбери роль и узнай секреты успешной игры на ней!</p>
                            <p className={styles.subtitle}>Загляни в раздел с чемпионами и посмотри их умения!</p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <ImageDisplay src={imageSrc} />
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.guideCards}>
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/all.png" text="Вводный курс"
                               roleImg="/images/main/all.svg" width={100} link="/guides/all/1" />
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/top.png" text="Верхняя линия"
                               roleImg="/images/main/top.svg" width={85} link="/guides/top/1" />
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/jungle.png" text="Лес"
                               roleImg="/images/main/jungle.svg" width={78} link="/guides/jungle/1" />
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/mid.png" text="Средняя линия"
                               roleImg="/images/main/mid.svg" width={85} link="/guides/mid/1" />
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/adc.png" text="Стрелок"
                               roleImg="/images/main/adc.svg" width={85} link="/guides/adc/1" />
                    <GuideCard onHover={setImageSrc} imageSrc="/images/main/support.png" text="Поддержка"
                               roleImg="/images/main/support.svg" width={104} link="/guides/support/1" />
                </div>
            </div>
        </main>
    )
}