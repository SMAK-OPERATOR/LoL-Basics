'use client';

import {ChampionDetails} from '@/types/champion';
import Header from '@/components/Header';
import styles from './page.module.scss';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import ScrollToTop from "@/components/ScrollToTop";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import Image from "next/image";

const classTranslations: { [key: string]: string } = {
    Fighter: 'Боец',
    Mage: 'Маг',
    Tank: 'Танк',
    Assassin: 'Убийца',
    Marksman: 'Стрелок',
    Support: 'Поддержка'
};

export default function ClientPage({ champion }: { champion: ChampionDetails }) {
    const [selectedSpellIndex, setSelectedSpellIndex] = useState<number>(0);

    const spellsWithTypes = [
        { type: 'P', ...champion.passive },
        ...champion.spells.map((spell, index) => ({
            type: ['Q', 'W', 'E', 'R'][index],
            ...spell
        }))
    ];
    return (
        <main className="mainContainer">
            <Header />
            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <div className={styles.titleWrapper}>
                        <p className={styles.name}>{champion.name}</p>
                        <p className={styles.title}>{champion.title}</p>
                        <div className={styles.roles}>
                            {champion.tags.map(tag => (
                                <div key={tag} className={styles.role}>
                                    <img
                                        src={`/images/roles/default/${tag.toLowerCase()}.svg`}
                                        alt={tag}
                                        className={styles.roleIcon}
                                    />
                                    <span className={styles.roleText}>
                    {classTranslations[tag] || tag}
                  </span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.lore}>
                            <p className={styles.loreTitle}>История</p>
                            <p className={styles.loreText}>{champion.lore}</p>
                        </div>
                    </div>
                    {/*<div className={styles.imageContainer}>*/}
                    {/*    <img*/}
                    {/*        src={champion.image}*/}
                    {/*        alt={champion.name}*/}
                    {/*        className={styles.championImage}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={styles.carouselContainer}>
                        <Swiper
                            modules={[Navigation, EffectFade]}
                            loop={true}
                            navigation={{
                                prevEl: `.${styles.swiperButtonPrev}`,
                                nextEl: `.${styles.swiperButtonNext}`,
                            }}
                            effect="fade"
                            className={styles.swiper}
                        >
                            {champion.skins.map((skin, index) => (
                                <SwiperSlide key={skin.name + index}>
                                    {/*<img*/}
                                    {/*    src={skin.image}*/}
                                    {/*    alt={skin.name}*/}
                                    {/*    className={styles.championImage}*/}
                                    {/*    loading="lazy"*/}
                                    {/*/>*/}
                                    <Image src={skin.image} alt={skin.name} className={styles.championImage} loading={"lazy"} layout="fill" objectFit={"cover"}></Image>
                                    <div className={styles.skinCaption}>
                                        <span className={styles.skinName}>{skin.name}</span>
                                    </div>
                                </SwiperSlide>
                            ))}

                            <div className={styles.swiperButtonPrev}>
                                <svg width="36" height="36" viewBox="0 0 24 24">
                                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                                </svg>
                            </div>
                            <div className={styles.swiperButtonNext}>
                                <svg width="36" height="36" viewBox="0 0 24 24">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                            </div>
                        </Swiper>
                    </div>
                </div>


                <div className={styles.spellsContainer}>
                    <div className={styles.spellsList}>
                        {spellsWithTypes.map((spell, index) => (
                            <div
                                key={spell.id}
                                className={`${styles.spellItem} ${
                                    selectedSpellIndex === index ? styles.active : ''
                                }`}
                                onClick={() => setSelectedSpellIndex(index)}
                            >
                                {/*<img*/}
                                {/*    src={spell.image}*/}
                                {/*    alt={spell.name}*/}
                                {/*    className={styles.spellImage}*/}
                                {/*/>*/}
                                <Image src={spell.image} alt={spell.name} className={styles.spellImage} width={45} height={45}></Image>
                                <span className={styles.spellType}>[{spell.type}]</span>
                                <span className={styles.spellName}>{spell.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.spellDetailsContainer}>
                        <div className={styles.spellDetails}>
                            <div className={styles.spellHeader}>
                                <img
                                    src={spellsWithTypes[selectedSpellIndex].image}
                                    className={styles.spellDetailImage}
                                />
                                {/*<Image src={spellsWithTypes[selectedSpellIndex].image} alt={spellsWithTypes[selectedSpellIndex].name} className={styles.spellImage} width={80} height={80}></Image>*/}
                                <div className={styles.spellHeaderInfo}>
                                    <div className={styles.spellKey}>
                                        [{spellsWithTypes[selectedSpellIndex].type}]
                                    </div>
                                    <p className={styles.spellDetailName}>
                                        {spellsWithTypes[selectedSpellIndex].name}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={styles.spellFullDescription}
                                dangerouslySetInnerHTML={{
                                    __html: spellsWithTypes[selectedSpellIndex].description
                                }}
                            />
                        </div>
                        {spellsWithTypes[selectedSpellIndex].video && (
                            <div className={styles.abilityVideoContainer}>
                                <video
                                    controls
                                    muted
                                    autoPlay
                                    className={styles.abilityVideo}
                                    key={spellsWithTypes[selectedSpellIndex].video} // Важно для сброса состояния
                                >
                                    <source
                                        src={spellsWithTypes[selectedSpellIndex].video}
                                        type="video/webm"
                                    />
                                    Ваш браузер не поддерживает видео тег.
                                </video>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <ScrollToTop theme={'all'}></ScrollToTop>
        </main>
    );
}