import {ApiSpell, ChampionDetails} from '@/types/champion';
import ClientPage from './ClientPage';

async function getChampion(id: string): Promise<ChampionDetails> {
    const version = '13.24.1';
    const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/champion/${id}.json`
    );

    if (!res.ok) throw new Error('Failed to fetch champion');

    const data = await res.json();
    const champData = data.data[id];
    const championId = champData.key.padStart(4, '0');
    const getVideoUrl = (abilityType: string, index: number) => {
        const suffix = index === -1 ? 'P1' : `${['Q','W','E','R'][index]}1`;
        return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championId}/ability_${championId}_${suffix}.webm`;
    };

    return {
        id: champData.id,
        name: champData.name,
        title: champData.title,
        tags: champData.tags,
        image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
        lore: champData.lore,
        spells: champData.spells.map((spell: ApiSpell, index: number) => ({
            id: spell.id,
            name: spell.name,
            description: spell.description,
            image: `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`,
            video: getVideoUrl('spell', index)
        })),
        passive: {
            id: champData.passive.name,
            name: champData.passive.name,
            description: champData.passive.description,
            image: `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champData.passive.image.full}`,
            video: getVideoUrl('passive', -1)
        },
        skins: [
            {
                name: champData.name, // Или можно использовать 'По умолчанию'
                image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
                num: 0
            },
            ...champData.skins
                .filter((skin: { num: number }) => skin.num > 0)
                .map((skin: { name: string; num: number }) => ({
                    name: skin.name,
                    image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`,
                    num: skin.num
                }))
        ]
    };
}
interface Props {
    params: {
        id: string;
    };
}


export default async function ChampionPage({ params }: Props) {
    const champion = await getChampion(params.id);
    return <ClientPage champion={champion} />;
}