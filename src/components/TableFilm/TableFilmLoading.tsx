import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import styles from './TableFilm.module.scss';

interface TableFilmLoadingProps {
    quantity: number;
    mt: number;
    is2Mobile?: boolean;
}

function TableFilmLoading({ quantity, mt, is2Mobile }: TableFilmLoadingProps) {
    return (
        <div style={{ marginTop: mt }} className={styles.root}>
            <div className={styles.list}>
                {Array(quantity)
                    .fill(1)
                    .map((item, index) => (
                        <div
                            key={index}
                            className={clsx(styles.item, {
                                [styles.is2Mobile]: is2Mobile,
                                [styles.is3Mobile]: !is2Mobile,
                            })}
                        >
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
