import loklokApi from 'apis/loklokApi';
import { fetchDataFailed } from 'features/detail/detailSlice';
import { Home } from 'models/loklok';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataSuccess, setBanner } from './browseSlice';

function* fetchData(action: any) {
    try {
        const page = action.payload;
        yield all([call(fetchBrowse, page), fetchBanner()]);
    } catch (error) {
        yield put(fetchDataFailed());
    }
}

function* fetchBrowse(page: any) {
    const response: Home = yield call(loklokApi.getHome, page);

    if (page === 0) {
        response.recommendItems.splice(0, 1);

        yield put(fetchDataSuccess(response.recommendItems));
    } else {
        yield put(fetchDataSuccess(response.recommendItems));
    }
}

function* fetchBanner() {
    const response: Home = yield call(loklokApi.getHome, 0);
    const banner = response.recommendItems.filter(
        (recommendItem) => recommendItem.homeSectionType === 'BANNER'
    )[0];
    console.log({ banner, response });
    yield put(setBanner(banner));
}

export default function* browseSaga() {
    yield takeLatest('browse/fetchData', fetchData);
}
