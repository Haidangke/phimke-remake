import { PayloadAction } from '@reduxjs/toolkit';
import loklokApi from 'apis/loklokApi';
import { Media, MediaParams } from 'models/loklok';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataFailed, fetchDataSuccess } from './watchsSlice';

function* fetchData(action: PayloadAction<MediaParams>) {
    try {
        const { category, contentId, episodeId, definition } = action.payload;
        const response: Media = yield call(loklokApi.getMedia, {
            category,
            contentId,
            episodeId,
            definition,
        });
        yield put(fetchDataSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(fetchDataFailed());
    }
}

function* watchsSaga() {
    yield takeLatest('watchs/fetchData', fetchData);
}

export default watchsSaga;
