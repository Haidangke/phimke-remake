import ImageLazyLoad from 'components/ImageLazyLoad';
import { SearchResults } from 'models/search';
import { Link } from 'react-router-dom';
import styles from './TableFilm.module.scss';

interface TableFilmProps {
    data?: SearchResults[];
}

function TableFilm({ data }: TableFilmProps) {
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {data?.map((film) => (
                    <Link key={film.id} className={styles.item} to={`/${film.domainType}/${film.id}`}>
                        <ImageLazyLoad name={film.name} coverVerticalUrl={film.coverVerticalUrl} size='400' />
                        <div className={styles.name}></div>
                    </Link>
                ))}
            </div>
            )
        </div>
    );
}

export default TableFilm;
