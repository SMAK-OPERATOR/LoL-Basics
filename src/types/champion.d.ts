export interface ChampionApiResponse {
    type: string;
    format: string;
    version: string;
    data: {
        [key: string]: ApiChampion;
    };
}

export interface ApiChampion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    tags: string[];
    partype: string;
    stats: {
        [key: string]: number;
    };
    spells: ApiSpell[];
    passive: {
        name: string;
        description: string;
        image: {
            full: string;
        };
    };
}

export interface ApiSpell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    cooldownBurn: string;
    costBurn: string;
    rangeBurn: string;
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
}

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
