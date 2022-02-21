import { useAppSelector } from 'app/hooks';

import Comment from 'features/comment';
import Similars from './components/Similars';
import styles from './Watchs.module.scss';
import Media from './components/Media';

function Watchs() {
    const { detail } = useAppSelector((state) => state.detail);

    return (
        <div className={styles.root}>
            <div className={styles.name}>{detail.name}</div>
            <div className={styles.media}>{<Media />}</div>
            <div className={styles.main}>
                <div className={styles.left}>{detail.id && <Comment filmId={detail.id} />}</div>
                <div className={styles.right}>{detail?.refList?.length > 0 && <Similars />}</div>
            </div>
        </div>
    );
}

export default Watchs;
