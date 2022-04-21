import ImageLazyLoad from 'components/ImageLazyLoad';
import { SearchResults } from 'models/search';
import { Link } from 'react-router-dom';
import styles from './TableFilm.module.scss';

interface TableFilmProps {
    data?: SearchResults[];
    newPage?: boolean;
}

function TableFilm({ data, newPage }: TableFilmProps) {
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {data?.map((film, index) =>
                    !newPage ? (
                        <Link key={index} className={styles.item} to={`/${film.domainType}/${film.id}`}>
                            <ImageLazyLoad
                                name={film.name}
                                coverVerticalUrl={film.coverVerticalUrl}
                                size={300}
                            />
                            <div className={styles.name}>{film.name}</div>
                        </Link>
                    ) : (
                        <div
                            key={index}
                            className={styles.item}
                            onClick={() =>
                                // window.open(`https://phimke.site/${film.domainType}/${film.id}`, '_blank')
                                window.open(`/${film.domainType}/${film.id}`, '_blank')
                            }
                        >
                            <ImageLazyLoad
                                name={film.name}
                                coverVerticalUrl={film.coverVerticalUrl}
                                size={300}
                            />
                            <div className={styles.name}>{film.name}</div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default TableFilm;
