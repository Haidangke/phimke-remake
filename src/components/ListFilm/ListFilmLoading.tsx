import useResize from 'hooks/useResize';
import Skeleton from 'react-loading-skeleton';
import styles from './ListFilm.module.scss';

function ListFilmLoading() {
    const { onMobile } = useResize();
    const listFilmLoading = Array(10).fill(1);
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <Skeleton height={22} width={170} />
            </div>
            <div className={styles.list}>
                {listFilmLoading.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <Skeleton
                            height={onMobile ? 225 : 255}
                            width={onMobile ? 150 : 170}
                            className={styles.top}
                        />
                        <Skeleton
                            style={{ marginTop: 8 }}
                            height={22}
                            width={onMobile ? 150 : 170}
                            className={styles.bottom}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListFilmLoading;
