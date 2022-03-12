import { PayloadAction } from '@reduxjs/toolkit';
import searchApi from 'apis/searchApi';
import { AdvancedSearch, AdvancedSearchParams } from 'models/search';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAnimeFailed,
    fetchAnimeSuccess,
    fetchMovieFailed,
    fetchMovieSuccess,
    fetchTvFailed,
    fetchTvSuccess,
    setAnime,
    setHasMoreAnime,
    setHasMoreMovie,
    setHasMoreTv,
    setMovie,
    setTv,
} from './discoverSlice';

function* fetchMovie(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        const response2: AdvancedSearch = yield call(searchApi.advancedSearch, {
            ...params,
            sort: response.searchResults.slice(-1).pop()?.sort || '',
        });
        if (response2.searchResults.length === 0) {
            yield put(setHasMoreMovie());
        }
        if (params.sort) {
            yield put(fetchMovieSuccess(response.searchResults));
        } else {
            yield put(setMovie(response.searchResults));
        }
    } catch (error) {
        yield put(fetchMovieFailed());
    }
}

function* fetchTv(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        const response2: AdvancedSearch = yield call(searchApi.advancedSearch, {
            ...params,
            sort: response.searchResults.slice(-1).pop()?.sort || '',
        });
        if (response2.searchResults.length === 0) {
            yield put(setHasMoreTv());
        }
        if (params.sort) {
            yield put(fetchTvSuccess(response.searchResults));
        } else {
            yield put(setTv(response.searchResults));
        }
    } catch (error) {
        yield put(fetchTvFailed());
    }
}

function* fetchAnime(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        const response2: AdvancedSearch = yield call(searchApi.advancedSearch, {
            ...params,
            sort: response.searchResults.slice(-1).pop()?.sort || '',
        });
        if (response2.searchResults.length === 0) {
            yield put(setHasMoreAnime());
        }
        if (params.sort) {
            yield put(fetchAnimeSuccess(response.searchResults));
        } else {
            yield put(setAnime(response.searchResults));
        }
    } catch (error) {
        yield put(fetchAnimeFailed());
    }
}

function* discoverSaga() {
    yield takeLatest('discover/fetchMovie', fetchMovie);
    yield takeLatest('discover/fetchTv', fetchTv);
    yield takeLatest('discover/fetchAnime', fetchAnime);
}

export default discoverSaga;
