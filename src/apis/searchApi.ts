import {
    SearchConfig,
    TopSearchKeywordsParams,
    SearchWithKeywordParams,
    SearchWithKeyword,
    SearchLeaderBoard,
    TopSearchKeywords,
} from 'models/search';
import loklokClient from './loklokClient';

const searchApi = {
    searchConfig(): Promise<SearchConfig> {
        return loklokClient.get('/search/list');
    },
    topSearchKeywords(params: TopSearchKeywordsParams): Promise<TopSearchKeywords> {
        return loklokClient.post(
            '/search/searchLenovo',
            {
                ...params,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );
    },
    searchWithKeyword(params: SearchWithKeywordParams): Promise<SearchWithKeyword> {
        return loklokClient.post(
            '/search/v1/searchWithKeyWord',
            {
                ...params,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            }
        );
    },
    searchLeaderBoard(): Promise<SearchLeaderBoard> {
        return loklokClient.get('/search/v1/searchLeaderboard');
    },
};

export default searchApi;
