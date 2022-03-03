import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './ListFilm.module.scss';
import { RecommendContentVO } from 'models/loklok';
import { verticalSize } from 'utils/resizeImage';

interface ItemFilmProps {
    item: RecommendContentVO;
}

function ItemFilm({ item }: ItemFilmProps) {
    return (
        <Link key={item.id} to={`/${item.category}/${item.id}`} className={styles.item}>
            <div className={styles.top}>
                <div className={styles.overplay}></div>
                <LazyLoadImage
                    className={styles.image}
                    alt={item.title}
                    src={verticalSize(item.imageUrl, 300)}
                    effect='opacity'
                />

                <div className={styles.dramaType}>{item.contentType}</div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.name}>{item.title}</div>
            </div>
        </Link>
    );
}

export default ItemFilm;
