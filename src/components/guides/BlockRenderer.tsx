import Image from 'next/image';
import styles from './BlockRenderer.module.scss';
import {GuideData, BlockType} from '@/types/guide';

interface BlockRendererProps {
    guideData: GuideData;
    pageNumber: number;
    theme?: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top'; // Добавляем пропс для темы
}

const validBlockTypes = new Set<BlockType>([
    'wide',
    'leftTextRightWide',
    'rightTextLeftWide',
    'leftTextRightSquare',
    'rightTextLeftSquare'
]);

const imageDimensions = {
    wide: 1340,
    leftTextRightWide: 554,
    rightTextLeftWide: 554,
    leftTextRightSquare: 435,
    rightTextLeftSquare: 435,
};

const BlockRenderer = ({guideData, pageNumber, theme}: BlockRendererProps) => {
    const page = guideData.guide.pages.find(p => p.pageNumber === pageNumber);
    if (!page) return null;

    const renderTextLines = (lines: string[]) => (
        <div className={styles.textContent}>
            {lines.map((line, index) => (
                <p key={index} className={styles.paragraph}>{line}</p>
            ))}
        </div>
    );

    return (
        <div className={`${styles.container} theme-${theme}`}>
            {page.blocks
                .filter(block => validBlockTypes.has(block.type as BlockType))
                .map((block, index) => {
                    const type = block.type as BlockType;
                    const isWide = type === 'wide';
                    const isSquare = type.includes('Square');
                    const isReverse = type.startsWith('rightText');

                    return (
                        <div key={index} className={`${styles.block} ${isWide ? styles.wideBlock : ''}`}>

                            {!isWide ? (
                                <div className={`${styles.contentRow} ${isReverse ? styles.reverse : ''}`}>
                                    <div className={styles.textColumn}>
                                        <p className={styles.header}>{block.header}</p>
                                        {renderTextLines(block.textLines)}
                                    </div>

                                    <div className={`${styles.imageWrapper} ${isSquare ? styles.square : ''}`}>
                                        <Image
                                            src={block.imagePath}
                                            alt={block.header}
                                            width={imageDimensions[type]}
                                            height={0}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className={styles.header}>{block.header}</p>
                                    <div className={styles.wideTextColumns}>
                                        {renderTextLines(block.textLines)}
                                        {block.rightLines && Array.isArray(block.rightLines) && block.rightLines.length > 0 && (
                                            renderTextLines(block.rightLines)
                                        )}
                                    </div>
                                    <div className={styles.wideImageWrapper}>
                                        <Image
                                            src={block.imagePath}
                                            alt={block.header}
                                            width={imageDimensions.wide}
                                            height={0}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default BlockRenderer;