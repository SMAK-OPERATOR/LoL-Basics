"use client";

import Image from 'next/image'; // Импортируем Image из next/image
import styles from './ImageDisplay.module.scss';

interface ImageDisplayProps {
    src: string; // Путь к изображению
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => {
    return (
        <div className={styles.imageContainer}>
            <Image
                src={src}
                alt="Dynamic Image"
                width={670}
                height={670}
                className={`${styles.mainImage} ${styles.fadeIn}`}
            />
        </div>
    );
};

export default ImageDisplay;