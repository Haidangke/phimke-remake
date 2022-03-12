export interface ScreeningItems {
    id: number;
    items: Array<{
        name: string;
        params: string;
        screeningType: string;
    }>;
    name: string;
}

export type SearchConfig = Array<{
    id: number;
    name: string;
    params: string;
    screeningItems: Array<ScreeningItems>;
}>;

export interface TopSearchKeywordsParams {
    searchKeyWord: string;
    size: number;
}

export interface SearchWithKeyword {
    searchResults: Array<{
        areas: Array<{
            id: number;
            name: string;
        }>;
        categoryTag: Array<{
            id: number;
            name: string;
        }>;
        coverHorizontalUrl: string;
        coverVerticalUrl: string;
        domainType: number;
        dramaType: {
            code: string;
            name: string;
        };
        duration?: string;
        id: number;
        name: string;
        releaseTime: string;
        sort: number;
    }>;
}

export interface SearchWithKeywordParams {
    searchKeyWord: string;
    size: number;
    sort?: string;
    searchType?: string;
}

export interface SearchLeaderBoard {
    list: Array<{
        cover: string;
        domainType: number;
        id: string;
        title: string;
    }>;
}

export interface TopSearchKeywords {
    searchResults: string[];
}

export interface SearchResults {
    coverVerticalUrl: string;
    domainType: number;
    id: string;
    name: string;
    sort: string;
}

export interface AdvancedSearch {
    searchResults: Array<SearchResults>;
}

export interface AdvancedSearchParams {
    size: number;
    params: string;
    area: string;
    category: string;
    year: string;
    subtitles: string;
    order: string;
    sort: string;
    [key: string]: any;
}
