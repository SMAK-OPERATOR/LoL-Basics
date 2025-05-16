'use client';

import { useState, useMemo } from 'react';
import { Champion } from '@/types/champion';
import Header from '@/components/Header';
import ChampionCard from '@/components/champions/ChampionCard';
import styles from './page.module.scss';
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientPage({ initialChampions }: { initialChampions: Champion[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const filteredChampions = useMemo(() => {
        return initialChampions.filter(champion => {
            const matchesSearch = champion.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRoles = selectedRoles.length === 0 ||
                champion.tags.some(tag => selectedRoles.includes(tag));
            return matchesSearch && matchesRoles;
        });
    }, [initialChampions, searchQuery, selectedRoles]);

    return (
        <main className="mainContainer">
            <Header />

            <div className={styles.filterContainer}>
                <div className={styles.searchWrapper}>
                    <svg className={styles.searchIcon} viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Найти чемпиона"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.rolesFilter}>
                    {['Fighter', 'Mage', 'Tank', 'Assassin', 'Marksman', 'Support'].map(role => (
                        <button
                            key={role}
                            onClick={() => setSelectedRoles(prev =>
                                prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
                            )}
                            className={`${styles.roleButton} ${
                                selectedRoles.includes(role) ? styles.active : ''
                            }`}
                        >
                            <img
                                src={`/images/roles/${
                                    selectedRoles.includes(role) ? 'active' : 'default'
                                }/${role.toLowerCase()}.svg`}
                                alt={role}
                                className={styles.roleIcon}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filteredChampions.map((champion) => (
                    <ChampionCard key={champion.id} champion={champion} />
                ))}
            </div>

            {filteredChampions.length === 0 && (
                <div className={styles.noResults}>
                    Чемпионы не найдены!
                </div>
            )}
            <ScrollToTop theme={'all'}></ScrollToTop>
        </main>
    );
}