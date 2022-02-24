import searchApi from 'apis/searchApi';
import ImageLazyLoad from 'components/ImageLazyLoad';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './Search.module.scss';

function Search() {
    const { keyword } = useParams();
    const { data, isLoading, isFetched } = useQuery(
        ['listFilmSearch', keyword],
        async () =>
            await searchApi.searchWithKeyword({
                searchKeyWord: keyword as string,
                size: 50,
            })
    );

    if (isFetched && data?.searchResults.length === 0) {
        return (
            <div className={styles.root}>
                <div className={styles.error}>Không có bộ phim nào với từ khóa là {keyword}</div>
            </div>
        );
    }
    return (
        <div className={styles.root}>
            <div className={styles.keyword}>Kết quả cho "{keyword}"</div>
            {isLoading ? (
                <div className={styles.list}>
                    {Array(10)
                        .fill(1)
                        .map((item, index) => (
                            <div key={index} className={styles.item}>
                                <Skeleton
                                    style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
                                />
                            </div>
                        ))}
                </div>
            ) : (
                <div className={styles.list}>
                    {data?.searchResults.map((film) => (
                        <Link key={film.id} className={styles.item} to={`/${film.domainType}/${film.id}`}>
                            <ImageLazyLoad
                                coverVerticalUrl={film.coverVerticalUrl}
                                size='200'
                                name={film.name}
                            />
                            <div className={styles.name}>{film.name}</div>

                            <div className={styles.dramaType}>
                                {film.dramaType.code} {film.dramaType.code === 'TV' && 'Shows'}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
