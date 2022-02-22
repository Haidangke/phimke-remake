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
    setMovie,
    setTv,
} from './discoverSlice';

function* fetchMovie(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    const size = params.size;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        if (size === 50) {
            yield put(setMovie(response.searchResults));
        } else {
            yield put(
                fetchMovieSuccess(
                    response.searchResults.splice(
                        response.searchResults.length - 25,
                        response.searchResults.length
                    )
                )
            );
        }
    } catch (error) {
        console.log(error);
        yield put(fetchMovieFailed());
    }
}

function* fetchTv(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    const size = params.size;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        if (size === 50) {
            yield put(setTv(response.searchResults));
        } else {
            yield put(
                fetchTvSuccess(
                    response.searchResults.splice(
                        response.searchResults.length - 25,
                        response.searchResults.length
                    )
                )
            );
        }
    } catch (error) {
        console.log(error);
        yield put(fetchTvFailed());
    }
}

function* fetchAnime(action: PayloadAction<AdvancedSearchParams>) {
    const params = action.payload;
    const size = params.size;
    try {
        const response: AdvancedSearch = yield call(searchApi.advancedSearch, params);
        if (size === 50) {
            yield put(setAnime(response.searchResults));
        } else {
            yield put(
                fetchAnimeSuccess(
                    response.searchResults.splice(
                        response.searchResults.length - 25,
                        response.searchResults.length
                    )
                )
            );
        }
    } catch (error) {
        console.log(error);
        yield put(fetchAnimeFailed());
    }
}

function* discoverSaga() {
    yield takeLatest('discover/fetchMovie', fetchMovie);
    yield takeLatest('discover/fetchTv', fetchTv);
    yield takeLatest('discover/fetchAnime', fetchAnime);
}

export default discoverSaga;
