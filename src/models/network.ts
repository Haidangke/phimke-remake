export interface Details {
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface AlternativeNames {
    id: number;
    result: Array<{
        name: string;
        type: string;
    }>;
}

export interface Images {
    id: number;
    logos: Array<{
        aspect_ratio: number;
        file_path: string;
        height: number;
        id: string;
        file_type: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }>;
}
