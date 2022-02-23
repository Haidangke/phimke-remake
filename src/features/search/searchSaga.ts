import { PayloadAction } from '@reduxjs/toolkit';
import searchApi from 'apis/searchApi';
import { SearchWithKeyword } from 'models/search';
import { call, debounce, put } from 'redux-saga/effects';
import { fetchSearchSuccess } from './searchSlice';

function* handleFetchData(action: PayloadAction<string>) {
    try {
        const keyword = action.payload;

        const response: SearchWithKeyword = yield call(searchApi.searchWithKeyword, {
            searchKeyWord: keyword,
            size: 10,
            sort: '',
            searchType: '',
        });
        yield put(fetchSearchSuccess(response));
    } catch (error) {}
}

export default function* searchSaga() {
    yield debounce(300, 'search/fetchSearch', handleFetchData);
}
