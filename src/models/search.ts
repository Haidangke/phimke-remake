export type SearchConfig = Array<{
    id: number;
    name: string;
    params: string;
    screeningItems: Array<{
        id: number;
        items: Array<{
            name: string;
            params: string;
            screeningType: string;
        }>;
        name: string;
    }>;
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
