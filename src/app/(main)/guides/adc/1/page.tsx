"use client";

import styles from '../page.module.scss';
import adcData from '../../../../../data/json/adc.json'
import Image from 'next/image';
import {ProgressTimeline} from '@/components/guides/ProgressTimeline';
import BlockRenderer from '@/components/guides/BlockRenderer';
import CustomButton from '@/components/guides/Button';
import ScrollToTop from '@/components/ScrollToTop';
import Header from "@/components/Header";
import { GuideData } from '@/types/guide';

export default function Home() {
    const pageNumber = 1;

    return (
        <main className="mainContainer">
            <div className={styles.upperContainer}>
                <Header theme={'adc'}></Header>
                <header className={styles.header}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={adcData.guide.topPicture}
                            alt="Top Guide Picture"
                            width={815}
                            height={500}
                            layout="intrinsic"
                        />
                    </div>
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
                            storageKey={`adc`}
                            theme="adc"
                            pageHrefs={[
                                '/guides/adc/1',
                                '/guides/adc/2',
                                '/guides/adc/3'
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
                            theme="adc"
                        />
                    </div>
                    <div className={styles.conclusionContainer}>
                        <p className={styles.firstLine}>{adcData.guide.pages[pageNumber-1].conclusion.firstLine}</p>
                        <p className={styles.secondLine}>{adcData.guide.pages[pageNumber-1].conclusion.secondLine}</p>

                    </div>
                    <div className={styles.lastBlock}>
                        <div className={styles.leftBlock}>
                            <p className={styles.buttonText}>Пройди тест, чтобы закрепить материал!</p>
                            <CustomButton href={"/guides/adc/1/test"} theme="adc">
                                Начать тест
                            </CustomButton>
                        </div>
                        <div className={styles.rightBlock}>
                            <p className={styles.buttonText}>Следующий раздел</p>
                            <CustomButton href={"/guides/adc/2"} theme="adc">
                                Перейти
                            </CustomButton>
                        </div>
                    </div>

                </main>
            </div>
            <ScrollToTop theme={'adc'}/>
        </main>
    );
}