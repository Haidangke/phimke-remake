import { Dates, Genres, Result } from './common';

export interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguages {
    iso_639_1: string;
    name: string;
}

export interface Details {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: object | null;
    budget: number;
    genres: Genres[];
    homepage: string | null;
    id: number;
    imdb_id: number;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
        name: string;
        id: number;
        logo_path?: string;
        origin_country: string;
    }>;
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: object | null;
    budget: number;
    genres: Genres[];
    homepage: string | null;
    id: number;
    imdb_id: number;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
        name: string;
        id: number;
        logo_path?: string;
        origin_country: string;
    }>;
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Lists {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: string | null;
}

export interface ReleaseDate {
    iso_3166_1: string;
    release_dates: Array<{
        certification: string;
        iso_639_1: string;
        release_date: string;
        type: number;
        note: string;
    }>;
}

export interface ReleaseDates {
    id: string;
    results: Array<ReleaseDate>;
}

export interface NowPlaying {
    page: number;
    total_pages: number;
    total_results: number;
    dates: Dates;
    results: Result[];
}

export interface UpComing extends NowPlaying {}

export interface MovieDiscover {
    sort_by?: string;
    include_adult?: boolean;
    include_video?: boolean;
    page?: number;
    primary_release_year?: number;
    ['primary_release_date.gte']?: string;
    ['primary_release_date.lte']?: string;
    ['release_date.gte']?: string;
    ['release_date.lte']?: string;
    with_release_type?: number;
    year?: number;
    ['vote_count.gte']?: number;
    ['vote_count.lte']?: number;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    with_companies?: string;
    with_genres?: string;
    without_genres?: string;
    with_keywords?: string;
    without_keywords?: string;
    ['with_runtime.gte']?: number;
    ['with_runtime.lte']?: number;
    with_original_language?: string;
    with_watch_providers?: string;
    watch_region?: string;
    with_watch_monetization_types?: string;
    without_companies?: string;
}
