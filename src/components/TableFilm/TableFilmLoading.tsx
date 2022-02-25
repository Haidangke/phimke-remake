import Skeleton from 'react-loading-skeleton';
import styles from './TableFilm.module.scss';

function TableFilmLoading({ quantity, mt }: { quantity: number; mt: number }) {
    return (
        <div style={{ marginTop: mt }} className={styles.root}>
            <div className={styles.list}>
                {Array(quantity)
                    .fill(1)
                    .map((item, index) => (
                        <div key={index} className={styles.item}>
                            <Skeleton
                                style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
export default TableFilmLoading;
