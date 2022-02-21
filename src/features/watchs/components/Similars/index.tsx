import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from 'app/hooks';
import { resizeImage } from 'utils/resizeImage';

import styles from './Similars.module.scss';
import { useParams } from 'react-router-dom';

function Similars() {
    const { detail } = useAppSelector((state) => state.detail);
    const { id } = useParams();
    console.log(detail?.refList);

    return (
        <div className={styles.root}>
            <div className={styles.title}>Thuộc series này</div>
            <div className={styles.list}>
                {detail?.refList
                    ?.filter((film) => film.id !== (id as string))
                    .map((film) => (
                        <div key={film.id} className={styles.item}>
                            <LazyLoadImage
                                className={styles.image}
                                alt={film.name}
                                src={resizeImage(film.coverHorizontalUrl, '400')}
                                effect='opacity'
                            />
                            <div className={styles.name}>{film.name}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Similars;
