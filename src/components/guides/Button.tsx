import Link from 'next/link';
import styles from './Button.module.scss';

interface CustomButtonProps {
    href: string;
    children: React.ReactNode;
    theme?: 'adc' | 'support' | 'jungle' | 'all' | 'mid' | 'top'; // Добавляем пропс для темы
}

const CustomButton = ({ href, theme, children  }: CustomButtonProps) => {
    return (
        <Link href={href} className={`${styles.button} theme-${theme}`}>
            <span className={styles.text}>{children}</span>
        </Link>
    );
};

export default CustomButton;