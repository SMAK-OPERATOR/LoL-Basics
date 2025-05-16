
import { Champion, ChampionApiResponse, ApiChampion } from '@/types/champion';
import ClientPage from './ClientPage';

async function getChampions(): Promise<Champion[]> {
    const version = '15.10.1';
    const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/champion.json`
    );
    const data: ChampionApiResponse = await res.json();

    return Object.values(data.data).map((champ: ApiChampion) => ({
        id: champ.id,
        name: champ.name,
        title: champ.title,
        tags: champ.tags,
        image: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`
    }));
}

export default async function ChampionsPage() {
    const champions = await getChampions();
    return <ClientPage initialChampions={champions} />;
}