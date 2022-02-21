import searchApi from 'apis/searchApi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { resizeImage } from 'utils/resizeImage';
import styles from './Search.module.scss';

function Search() {
    const { keyword } = useParams();
    const { data, isLoading } = useQuery(
        ['listFilmSearch', keyword],
        async () =>
            await searchApi.searchWithKeyword({
                searchKeyWord: keyword as string,
                size: 50,
            })
    );
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
                            <LazyLoadImage
                                className={styles.image}
                                alt={film.name}
                                src={resizeImage(film.coverVerticalUrl, '500')}
                                effect='opacity'
                            />
                            <div className={styles.name}></div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
