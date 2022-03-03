import clsx from 'clsx';
import useResize from 'hooks/useResize';
import Skeleton from 'react-loading-skeleton';
import styles from './TableFilm.module.scss';

interface TableFilmLoadingProps {
    column?: number;
    quantity: number;
    mt: number;
}

function TableFilmLoading({ quantity, mt, column }: TableFilmLoadingProps) {
    const { onMobile } = useResize();
    return (
        <div style={{ marginTop: mt }} className={styles.root}>
            <div className={styles.list}>
                {Array(quantity)
                    .fill(1)
                    .map((item, index) => (
                        <div
                            key={index}
                            className={clsx({
                                [styles.item]: !onMobile || !(column === 2),
                                [styles.item2]: column === 2,
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
