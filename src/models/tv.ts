import { Genres } from './common';

export interface Episode {
    air_date: string;
    episode_number: number;
    crew: Array<{
        id: number;
        credit_id: string;
        name: string;
        department: string;
        job: string;
        profile_path: string | null;
    }>;
    name: string;
    overview: string;
    id: number;
    production_code: string | null;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;

    guest_stars: Array<{
        id: number;
        name: string;
        credit_id: string;
        character: string;
        order: number;
        profile_path: string | null;
    }>;
}

export interface Seasons {
    _id: string;
    air_date: string;
    name: string;
    overview: string;
    id: number;
    poster_path: string | null;
    season_number: number;

    episodes: Array<{
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string;
        vote_average: number;
        vote_count: number;

        crew: Array<{
            department: string;
            job: string;
            credit_id: string;
            adult: boolean | null;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string | null;
        }>;

        guest_stars: Array<{
            credit_id: string;
            order: number;
            character: string;
            adult: boolean;
            gender: number | null;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string | null;
        }>;
    }>;
}

export interface Details {
    backdrop_path: string | null;
    created_by: Array<{
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null;
    }>;
    episode_run_time: number[];
    first_air_date: string;
    genres: Genres[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;

    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    };
    name: string;
    next_episode_to_air: null;
    networks: Array<{
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
        id: number;
        logo_path: null | string;
        name: string;
        origin_country: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    seasons: Array<{
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }>;

    spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
    }>;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface Tv {
    backdrop_path: string | null;
    created_by: Array<{
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null;
    }>;
    episode_run_time: number[];
    first_air_date: string;
    genres: Genres[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;

    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    };
    name: string;
    next_episode_to_air: null;
    networks: Array<{
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
        id: number;
        logo_path: null | string;
        name: string;
        origin_country: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    seasons: Array<{
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }>;

    spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
    }>;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface Recommendations {
    poster_path: string | null;
    popularity: number;
    id: number;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

export interface TvDiscover {
    sort_by?: string;
    ['air_date.gte']?: string;
    ['air_date.lte']?: string;
    ['first_air_date.gte']?: string;
    ['first_air_date.lte']?: string;
    first_air_date_year?: number;
    page?: number;
    timezone?: string;
    ['vote_average.gte']?: string;
    ['vote_count.gte']?: string;
    with_genres?: string;
    with_networks?: string;
    without_genres?: string;
    ['with_runtime.gte']?: string;
    ['with_runtime.lte']?: string;
    include_null_first_air_dates?: boolean;
    without_keywords?: string;
    with_keywords?: string;
    screened_theatrically?: boolean;
    with_status?: '0' | '1' | '2' | '3' | '4' | '5';
    with_type?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
}
