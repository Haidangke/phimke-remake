import { PayloadAction } from '@reduxjs/toolkit';
import searchApi from 'apis/searchApi';
import { SearchLeaderBoard, SearchWithKeyword, SearchWithKeywordParams } from 'models/search';
import { call, debounce, put } from 'redux-saga/effects';
import { fetchSearchSuccess } from './searchSlice';

function* handleFetchData(action: PayloadAction<string>) {
    try {
        const keyword = action.payload;

        if (!keyword) {
            const response: SearchLeaderBoard = yield call(searchApi.searchLeaderBoard);
            // yield put(setMultiSearch(response));
            // yield put(fetchSearchSuccess());
        } else {
            const response: SearchWithKeyword = yield call(searchApi.searchWithKeyword, {
                searchKeyWord: keyword,
                size: 7,
                sort: '',
                searchType: '',
            });
            yield put(fetchSearchSuccess(response));
        }
    } catch (error) {}
}

export default function* searchSaga() {
    yield debounce(300, 'search/fetchSearch', handleFetchData);
}
