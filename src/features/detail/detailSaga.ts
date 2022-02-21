import { Background } from 'models/common';
import { call, takeLatest, put } from 'redux-saga/effects';
import { setDetail, fetchDataSuccess, setBackground, fetchDataFailed } from './detailSlice';

import getBackground from 'utils/getBackground';
import { Detail } from 'models/loklok';
import loklokApi from 'apis/loklokApi';

function* fetchDetails(id: any, category: number) {
    const response: Detail = yield call(loklokApi.getDetail, id, category);
    yield put(setDetail(response));
    yield call(fetchBackground, response?.coverVerticalUrl || response?.coverHorizontalUrl);
}

function* fetchBackground(poster_path: any) {
    try {
        const background: Background = yield call(getBackground, poster_path);

        yield put(setBackground(background));
    } catch (error) {
        const background: Background = {
            color: '30, 30, 30',
            isDark: true,
        };
        yield put(setBackground(background));
    }
}

function* fetchData(action: any) {
    const id = action.payload.id;
    const category = action.payload.category;
    try {
        yield call(fetchDetails, id, category);
        yield put(fetchDataSuccess());
    } catch (error) {
        console.log(error);
        yield put(fetchDataFailed());
    }
}

export default function* detailSaga() {
    yield takeLatest('detail/fetchData', fetchData);
}
