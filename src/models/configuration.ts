export interface Countries {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
}

export interface Languages {
    iso_639_1: string;
    english_name: string;
    native_name: string;
}

export type ImageSize = 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'w1280' | 'original';
