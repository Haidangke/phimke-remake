import { useAppSelector } from 'app/hooks';
import {
    fetchMovie,
    discoverMovieSelector,
    discoverTvSelector,
    discoverAnimeSelector,
    fetchTv,
    fetchAnime,
    setSizeMovie,
    setSizeTv,
    setSizeAnime,
} from 'features/discover/discoverSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TableFilm from 'components/TableFilm';
import TableFilmLoading from 'components/TableFilm/TableFilmLoading';
import Filter from './components/Filter';
import { useParams } from 'react-router-dom';
import NotFound from 'components/NotFound';
import styles from './Discover.module.scss';
import clsx from 'clsx';
import useResize from 'hooks/useResize';

function Discover() {
    const [column, setColumn] = useState(2);
    const { onMobile } = useResize();

    const dispatch = useDispatch();
    const { id } = useParams();
    const movie = useAppSelector(discoverMovieSelector);
    const tv = useAppSelector(discoverTvSelector);
    const anime = useAppSelector(discoverAnimeSelector);

    function fetchMoreData() {
        if (id) {
            if (parseInt(id) === 1 && movie.filter.size === movie.data.length) {
                dispatch(setSizeMovie());
            } else if (parseInt(id) === 2 && tv.filter.size === tv.data.length) {
                dispatch(setSizeTv());
            } else if (parseInt(id) === 3 && anime.filter.size === anime.data.length) {
                dispatch(setSizeAnime());
            }
        }
    }

    useEffect(() => {
        if (id) {
            if (
                parseInt(id) === 1 &&
                (movie.filter.size === movie.data.length + 25 || movie.filter.size === 50)
            ) {
                dispatch(fetchMovie(movie.filter));
            } else if (
                parseInt(id) === 2 &&
                (tv.filter.size === tv.data.length + 25 || tv.filter.size === 50)
            ) {
                dispatch(fetchTv(tv.filter));
            } else if (
                parseInt(id) === 3 &&
                (anime.filter.size === anime.data.length + 25 || anime.filter.size === 50)
            ) {
                dispatch(fetchAnime(anime.filter));
            }
        }
    }, [
        anime.data.length,
        anime.filter,
        dispatch,
        id,
        movie.data.length,
        movie.filter,
        tv.data.length,
        tv.filter,
    ]);

    if (![1, 2, 3].includes(parseInt(id as string))) return <NotFound />;

    if (!id) return <NotFound />;
    const data = parseInt(id) === 1 ? movie : parseInt(id) === 2 ? tv : anime;

    return (
        <div className={styles.root}>
            <Filter id={parseInt(id)} />
            {onMobile && (
                <div className={styles.filter}>
                    Số phim hiển thị mỗi hàng
                    {[2, 3].map((item) => (
                        <span
                            key={item}
                            onClick={() => setColumn(item)}
                            className={clsx(styles.filterNum, {
                                [styles.filterNumActive]: item === column,
                            })}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}
            {data.isLoading ? (
                <TableFilmLoading mt={20} quantity={18} column={column} />
            ) : (
                <InfiniteScroll
                    dataLength={data.data.length}
                    next={fetchMoreData}
                    hasMore={data.hasMore}
                    loader={<TableFilmLoading mt={0} quantity={12} column={column} />}
                >
                    <TableFilm data={data.data} column={column} />
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Discover;
