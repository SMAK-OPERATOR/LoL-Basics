export interface Champion {
    id: string;
    name: string;
    title: string;
    tags: string[];
    image: string;
}

export interface ChampionDetails extends Champion {
    lore: string;
    spells: Spell[];
    passive: Spell;
    skins: Skin[];
}

export interface Spell {
    id: string;
    name: string;
    description: string;
    image: string;
    video?: string;
}

interface Skin {
    name: string;
    image: string;
    num: number;
}
