import { all } from 'redux-saga/effects';
import detailSaga from 'features/detail/detailSaga';
import searchSaga from 'features/search/searchSaga';
import browseSaga from 'features/browse/browseSaga';
import watchsSaga from 'features/watchs/watchsSaga';
import discoverSaga from 'features/discover/discoverSaga';

export default function* rootSaga() {
    yield all([detailSaga(), searchSaga(), browseSaga(), watchsSaga(), discoverSaga()]);
}
