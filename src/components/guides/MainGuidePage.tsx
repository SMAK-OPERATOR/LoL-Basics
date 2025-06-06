"use client";

import { useMemo,useState,useEffect  } from 'react';
import Image from 'next/image';
import styles from './MainGuidePage.module.scss';
import { ProgressTimeline } from '@/components/guides/ProgressTimeline';
import BlockRenderer from '@/components/guides/BlockRenderer';
import CustomButton from '@/components/guides/Button';
import ScrollToTop from '@/components/ScrollToTop';
import Header from "@/components/Header";
import { GuideData } from '@/types/guide';
import { supabase } from '@/lib/supabaseClient';

interface GuidePageProps {
    theme: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top';
    pageNumber: number;
}

export default function GuidePage({ theme, pageNumber }: GuidePageProps) {
    const [guideData, setGuideData] = useState<GuideData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const { data, error: supabaseError } = await supabase
                    .from('guides')
                    .select('content')
                    .eq('slug', theme)
                    .single();

                if (supabaseError) throw supabaseError;
                if (!data) throw new Error('Guide not found');

                setGuideData(data.content);
            } catch (err) {
                setError('Failed to load guide data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [theme]);

    const maxPages = theme === 'jungle' ? 4 : 3;
    const isLastPage = pageNumber === maxPages;

    const pageHrefs = useMemo(() =>
            Array.from({ length: maxPages }, (_, i) => `/guides/${theme}/${i + 1}`),
        [theme, maxPages]
    );
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!guideData) return null;
    return (
        <main className="mainContainer" >
            <div className={`${styles.upperContainer} theme-${theme}`}>
                <Header theme={theme} />
                {theme !== 'all' && (
                <header className={styles.header}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={guideData.guide.topPicture}
                            alt="Top Guide Picture"
                            width={815}
                            height={500}
                            layout="intrinsic"
                        />
                    </div>
                </header>)}

                <main className={styles.main}>
                    <div className={styles.descContainer}>
                        <div className={styles.mainTitle}>
                            {guideData.guide.mainTitle}
                        </div>
                        <div className={styles.mainDescription}>
                            {guideData.guide.description}
                        </div>
                    </div>

                    <div className={styles.timeLineContainer}>
                        <ProgressTimeline
                            timeLine={guideData.guide.timeLine}
                            storageKey={theme}
                            theme={theme}
                            pageHrefs={pageHrefs}
                        />
                    </div>

                    <div className={styles.descContainer}>
                        <div className={styles.mainTitle}>
                            {guideData.guide.pages[pageNumber - 1].title}
                        </div>
                        <div className={styles.mainDescription}>
                            {guideData.guide.pages[pageNumber - 1].description}
                        </div>
                    </div>

                    <div className={styles.contentContainer}>
                        <BlockRenderer
                            guideData={guideData as unknown as GuideData}
                            pageNumber={pageNumber}
                            theme={theme}
                        />
                    </div>

                    <div className={styles.conclusionContainer}>
                        <p className={styles.firstLine}>
                            {guideData.guide.pages[pageNumber - 1].conclusion.firstLine}
                        </p>
                        <p className={styles.secondLine}>
                            {guideData.guide.pages[pageNumber - 1].conclusion.secondLine}
                        </p>
                    </div>

                    <div className={styles.lastBlock}>
                        <div className={styles.leftBlock}>
                            <p className={styles.buttonText}>Пройди тест, чтобы закрепить материал!</p>
                            <CustomButton href={`/guides/${theme}/${pageNumber}/test`} theme={theme}>
                                Начать тест
                            </CustomButton>
                        </div>

                        {!isLastPage && (
                            <div className={styles.rightBlock}>
                                <p className={styles.buttonText}>Следующий раздел</p>
                                <CustomButton href={`/guides/${theme}/${pageNumber + 1}`} theme={theme}>
                                    Перейти
                                </CustomButton>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <ScrollToTop theme={theme} />
        </main>
    );
}