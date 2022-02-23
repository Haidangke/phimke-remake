import { useAppSelector } from 'app/hooks';
import {
    fetchMovie,
    discoverMovieSelector,
    setFilterMovie,
    discoverTvSelector,
    discoverAnimeSelector,
    setFilterTv,
    setFilterAnime,
    fetchTv,
    fetchAnime,
} from 'features/discover/discoverSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TableFilm from 'components/TableFilm';
import TableFilmLoading from 'components/TableFilm/TableFilmLoading';
import Filter from './components/Filter';
import { useParams } from 'react-router-dom';
import NotFound from 'components/NotFound';
import styles from './Discover.module.scss';

function Discover() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useAppSelector(discoverMovieSelector);
    const tv = useAppSelector(discoverTvSelector);
    const anime = useAppSelector(discoverAnimeSelector);

    const fetchMoreData = () => {
        if (id) {
            if (parseInt(id) === 1) {
                dispatch(setFilterMovie({ ...movie.filter, size: movie.filter.size + 25 }));
            } else if (parseInt(id) === 2) {
                dispatch(setFilterTv({ ...tv.filter, size: tv.filter.size + 25 }));
            } else {
                dispatch(setFilterAnime({ ...anime.filter, size: anime.filter.size + 25 }));
            }
        }
    };

    useEffect(() => {
        if (id) {
            if (parseInt(id) === 1) {
                dispatch(dispatch(fetchMovie(movie.filter)));
            } else if (parseInt(id) === 2) {
                dispatch(dispatch(fetchTv(tv.filter)));
            } else {
                dispatch(dispatch(fetchAnime(anime.filter)));
            }
        }
    }, [anime.filter, dispatch, id, movie.filter, tv.filter]);
    if (!id) return <NotFound />;
    const data = parseInt(id) === 1 ? movie : parseInt(id) === 2 ? tv : anime;

    return (
        <div className={styles.root}>
            <Filter id={parseInt(id)} />
            <InfiniteScroll
                dataLength={data.filter.size}
                next={fetchMoreData}
                hasMore={true}
                loader={<TableFilmLoading mt={0} quantity={6} />}
            >
                {data.data?.length === 0 && data.isFetched ? (
                    <div className={styles.notData}>Không tìm thấy phim nào !</div>
                ) : data.data?.length === 0 ? (
                    <TableFilmLoading mt={20} quantity={12} />
                ) : (
                    <TableFilm data={data.data} />
                )}
            </InfiniteScroll>
        </div>
    );
}

export default Discover;
