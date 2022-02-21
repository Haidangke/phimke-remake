import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ImageBanner from 'assets/banner.jpg';
import ListFilm from 'components/ListFilm';
import styles from './Browse.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { browseSelector, fetchData, indexSelector, setIndex } from './browseSlice';
import ListFilmLoading from 'components/ListFilm/ListFilmLoading';

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
                <section className={styles.banner}>
                    <div className={styles.overplay}></div>
                    <img src={ImageBanner} alt='banner' className={styles.image} />
                    <div className={styles.content}>
                        <div className={styles.title}>Welcome.</div>
                        <div className={styles.description}>
                            Millions of movies, TV shows and people to discover. Explore now.
                        </div>
                    </div>
                </section>
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
