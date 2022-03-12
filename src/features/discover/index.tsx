import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppSelector } from 'app/hooks';
import {
    fetchMovie,
    discoverMovieSelector,
    discoverTvSelector,
    discoverAnimeSelector,
    fetchTv,
    fetchAnime,
} from 'features/discover/discoverSlice';

import TableFilm from 'components/TableFilm';
import TableFilmLoading from 'components/TableFilm/TableFilmLoading';
import Filter from './components/Filter';
import NotFound from 'components/NotFound';
import styles from './Discover.module.scss';

function Discover() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useAppSelector(discoverMovieSelector);
    const tv = useAppSelector(discoverTvSelector);
    const anime = useAppSelector(discoverAnimeSelector);

    useEffect(() => {
        if (id) {
            if (parseInt(id) === 1) {
                dispatch(fetchMovie(movie.filter));
            } else if (parseInt(id) === 2) {
                dispatch(fetchTv(tv.filter));
            } else if (parseInt(id) === 3) {
                dispatch(fetchAnime(anime.filter));
            }
        }
    }, [anime.filter, dispatch, id, movie.filter, tv.filter]);

    function fetchMoreData() {
        if (id) {
            if (parseInt(id) === 1) {
                dispatch(fetchMovie({ ...movie.filter, sort: movie.data.slice(-1).pop()?.sort || '' }));
            } else if (parseInt(id) === 2) {
                dispatch(fetchTv({ ...tv.filter, sort: tv.data.slice(-1).pop()?.sort || '' }));
            } else if (parseInt(id) === 3) {
                dispatch(fetchAnime({ ...anime.filter, sort: anime.data.slice(-1).pop()?.sort || '' }));
            }
        }
    }

    if (![1, 2, 3].includes(parseInt(id as string))) return <NotFound />;

    if (!id) return <NotFound />;
    const data = parseInt(id) === 1 ? movie : parseInt(id) === 2 ? tv : anime;
    const isError = parseInt(id) === 1 ? movie.isError : parseInt(id) === 2 ? tv.isError : anime.isError;

    return (
        <div className={styles.root}>
            <Filter id={parseInt(id)} />

            {data.isLoading ? (
                <TableFilmLoading mt={20} quantity={18} />
            ) : (
                <InfiniteScroll
                    dataLength={data.data.length}
                    next={fetchMoreData}
                    hasMore={data.hasMore}
                    loader={!isError ? <TableFilmLoading mt={0} quantity={12} /> : <></>}
                >
                    <TableFilm data={data.data} newPage />
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Discover;
