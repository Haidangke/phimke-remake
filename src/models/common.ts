export interface Genres {
    id: number;
    name: string;
}

export interface Response<T> {
    page: number;
    total_results: number;
    total_pages: number;
    results: T[];
}

export interface Result {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title?: string;
    name?: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    original_name?: string;
}

export interface Videos {
    id: number;
    results: Array<{
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
    }>;
}

export interface Image {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface Images {
    id: number;
    backdrops: Image[];
    posters: Image[];
    logos: Image[];
}

export interface Dates {
    maximum: string;
    minimum: string;
}

export interface ListParams {
    page: number;
    [key: string]: any;
}

export interface Reviews {
    id: number;
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<{
        author: string;
        content: string;
        created_at: string;
        id: string;
        updated_at: string;
        url: string;
        author_details: {
            name: string;
            username: string;
            avatar_path: string | null;
            rating: number | null;
        };
    }>;
}

export interface PopupProp {
    title: string;
    body: Array<{
        name: string;
        path?: string;
    }>;
}

export interface Title {
    iso_3166_1: string;
    title: string;
    type: string;
}

export interface AlternativeTitles {
    id: number;
    titles: Title[];
    results: Title[];
}

export interface Crew {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}

export interface Credits {
    id: number;
    cast: Array<{
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        character: string;
        credit_id: string;
        order: number;
    }>;
    crew: Array<Crew>;
}

export interface Translations {
    id: number;
    translations: Array<{
        iso_3166_1: string;
        iso_639_1: string;
        name: string;
        english_name: string;
        data: {
            title: string;
            overview: string;
            homepage: string;
            tagline: string;
            runtime: number;
        };
    }>;
}

export type Media = 'tv' | 'movie';

export type Type = 'popular' | 'trending' | 'top_rated' | 'upcoming';

export interface Background {
    color: string;
    isDark: boolean;
}

export interface Keywords {
    id: number;
    results: Array<{
        id: number;
        name: string;
    }>;
}

export interface Config<T> {
    language: 'vi' | 'en';
    data: Array<T>;
}

export interface Subtitle {
    label: string;
    kind: string;
    src: string;
    srcLang: string;
}
