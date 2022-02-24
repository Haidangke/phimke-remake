import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchData } from './detailSlice';
import styles from './Detail.module.scss';
import Loading from 'components/Loading/Loading';
import Introduce from './components';
import ListFilm from 'components/ListFilm';
import { RecommendContentVO } from 'models/loklok';
import WatchsPage from 'features/watchs';

function Detail() {
    const dispatch = useAppDispatch();
    const { category, id } = useParams();
    const { isError, isLoading, detail, isFetched } = useAppSelector((state) => state.detail);

    const recommendations: RecommendContentVO[] = detail?.likeList?.map((item) => ({
        id: item.id,
        title: item.name,
        category: item.category,
        imageUrl: item.coverVerticalUrl,
    }));

    useEffect(() => {
        dispatch(fetchData({ id, category }));
    }, [category, id, dispatch]);

    return isError || ((category as string) !== '1' && (category as string) !== '0') ? (
        <div className={styles.error}>
            <div className={styles.contentError}>Oops! We can't find the page you're looking for !!!</div>
        </div>
    ) : (
        <Routes>
            <Route
                path='/'
                element={
                    isLoading || !isFetched ? (
                        <Loading space={110} />
                    ) : (
                        <div className={styles.root}>
                            <Introduce />
                            <div className={styles.main}>
                                <ListFilm data={recommendations} title='Đề xuất' />
                            </div>
                        </div>
                    )
                }
            />
            <Route path='/watchs' element={<WatchsPage />} />
        </Routes>
    );
}

export default Detail;
