"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './GuideCard.module.scss';

interface GuideCardProps {
    onHover: (imageSrc: string) => void; // Функция для изменения изображения
    imageSrc: string; // Путь к изображению
    text: string; // Текст под изображением
    roleImg: string;
    width: number;
    link: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ onHover, imageSrc, text, roleImg,width,link }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <Link href={link} passHref className={styles.link}>
            <div
                className={`${styles.guideCard} ${isActive ? styles.active : ''}`}
                onMouseEnter={() => onHover(imageSrc)} // Вызываем функцию при наведении
                onMouseLeave={() => setIsActive(false)} // Сбрасываем состояние при уходе мыши
                onMouseDown={() => setIsActive(true)} // Устанавливаем активное состояние при нажатии
                onMouseUp={() => setIsActive(false)} // Сбрасываем активное состояние при отпускании кнопки
            >
                <div className={styles.container}>
                        <Image
                            src={roleImg}
                            alt={text}
                            height={85}
                            width={width}
                            className={styles.image}
                        />
                    <div className={styles.textBox}>
                        <p className={styles.text}>{text}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GuideCard;