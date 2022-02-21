import Loading from 'components/Loading/Loading';
import { Result } from 'models/common';

import styles from './FilmCollection.module.scss';

interface FilmCollectionProps {
    filmCollection?: Result[];
    isLoading: boolean;
    media: string;
}

function FilmCollection({ filmCollection, isLoading, media }: FilmCollectionProps) {
    if (isLoading) return <Loading space={100} />;
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {filmCollection?.map((film) => (
                    <div key={film.id} className={styles.item}>
                        {/* <ItemFilm item={film} media={media} width='100%' height='100%' /> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilmCollection;
