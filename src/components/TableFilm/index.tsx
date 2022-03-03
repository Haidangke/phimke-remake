import clsx from 'clsx';
import ImageLazyLoad from 'components/ImageLazyLoad';
import useResize from 'hooks/useResize';
import { SearchResults } from 'models/search';
import { Link } from 'react-router-dom';
import styles from './TableFilm.module.scss';

interface TableFilmProps {
    data?: SearchResults[];
    column?: number;
}

function TableFilm({ data, column }: TableFilmProps) {
    const { onMobile } = useResize();
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {data?.map((film, index) => (
                    <Link
                        key={index}
                        className={clsx({
                            [styles.item]: !onMobile || !(column === 2),
                            [styles.item2]: column === 2,
                        })}
                        to={`/${film.domainType}/${film.id}`}
                    >
                        <ImageLazyLoad name={film.name} coverVerticalUrl={film.coverVerticalUrl} size={300} />
                        <div className={styles.name}>{film.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TableFilm;
