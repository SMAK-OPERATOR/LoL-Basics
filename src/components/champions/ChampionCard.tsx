import Image from 'next/image';
import Link from 'next/link';
import { Champion } from '@/types/champion';
import styles from './ChampionCard.module.scss';

const roleIcons = {
    Fighter: '/images/roles/fighter.svg',
    Mage: '/images/roles/mage.svg',
    Tank: '/images/roles/tank.svg',
    Assassin: '/images/roles/assassin.svg',
    Marksman: '/images/roles/marksman.svg',
    Support: '/images/roles/support.svg',
} as const;

export default function ChampionCard({ champion }: { champion: Champion }) {
    return (
        <Link
            href={`/champions/${champion.id}`}
            className={styles.cardLink}
            prefetch={false}
        >
            <div className={styles.cardWrapper}>
                <div className={styles.imageContainer}>
                    <Image
                        src={champion.image}
                        alt={champion.name}
                        fill
                        className={styles.championImage}
                        sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className={styles.infoOverlay}>
                        <div className={styles.textContent}>
                            <p className={styles.name}>{champion.name}</p>
                        </div>
                        <div className={styles.roles}>
                            {champion.tags.map((role) => (
                                <img
                                    key={role}
                                    src={roleIcons[role as keyof typeof roleIcons]}
                                    alt={role}
                                    className={styles.roleIcon}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}