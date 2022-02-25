import loklokApi from 'apis/loklokApi';
import { fetchDataFailed } from 'features/detail/detailSlice';
import { Home } from 'models/loklok';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, setHasMore } from './browseSlice';

function* fetchData(action: any) {
    try {
        const page = action.payload;
        const response: Home = yield call(loklokApi.getHome, page);

        if (response.recommendItems.length === 0) {
            yield put(setHasMore());
        }

        if (page === 0) {
            response.recommendItems.splice(0, 1);
            yield put(fetchDataSuccess(response.recommendItems));
        } else {
            yield put(fetchDataSuccess(response.recommendItems));
        }
    } catch (error) {
        yield put(fetchDataFailed());
    }
}

export default function* browseSaga() {
    yield takeLatest('browse/fetchData', fetchData);
}
