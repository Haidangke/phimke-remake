import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from 'app/hooks';
import { resizeImage } from 'utils/resizeImage';

import styles from './Similars.module.scss';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RefList } from 'models/loklok';

interface SimilarsProps {
    isLoading: boolean;
    data: RefList;
}

function Similars({ data, isLoading }: SimilarsProps) {
    const { id } = useParams();

    return (
        <div className={styles.root}>
            <div className={styles.title}>Thuộc series này</div>
            <div className={styles.list}>
                {isLoading
                    ? Array(2)
                          .fill(1)
                          .map((item, index) => (
                              <div key={index} className={styles.item}>
                                  <Skeleton
                                      style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}
                                  />
                              </div>
                          ))
                    : data
                          ?.filter((film) => film.id !== (id as string))
                          .map((film) => (
                              <div key={film.id} className={styles.item}>
                                  <LazyLoadImage
                                      className={styles.image}
                                      alt={film.name}
                                      src={resizeImage(
                                          film.coverHorizontalUrl || film.coverVerticalUrl,
                                          '400'
                                      )}
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
