import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListFilm from 'components/ListFilm';
import styles from './Browse.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { browseSelector, fetchData, indexSelector, setIndex } from './browseSlice';
import ListFilmLoading from 'components/ListFilm/ListFilmLoading';
import Banner from 'features/banner';

function Browse() {
    const browse = useAppSelector(browseSelector);

    const index = useAppSelector(indexSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchData(0));
    }, [dispatch]);

    function fetchMoreData() {
        dispatch(setIndex());
        dispatch(fetchData(index));
    }

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Banner />
                <div className={styles.main}>
                    <InfiniteScroll
                        dataLength={browse?.length || 0}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<ListFilmLoading />}
                    >
                        {browse.length === 0 ? (
                            <ListFilmLoading />
                        ) : (
                            browse
                                .filter((listFilm) => listFilm.homeSectionId !== 81012)
                                .map((listFilm, index) => (
                                    <ListFilm
                                        key={index}
                                        data={listFilm?.recommendContentVOList}
                                        title={listFilm?.homeSectionName}
                                    />
                                ))
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

export default Browse;
