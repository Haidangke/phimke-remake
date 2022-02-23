import styles from './Similars.module.scss';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RefList } from 'models/loklok';
import ImageLazyLoad from 'components/ImageLazyLoad';

interface SimilarsProps {
    isLoading: boolean;
    data: RefList;
}

function Similars({ data, isLoading }: SimilarsProps) {
    const { id, category } = useParams();

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
                                  <ImageLazyLoad
                                      name={film.name}
                                      coverVerticalUrl={film.coverVerticalUrl}
                                      size='300'
                                  />
                                  <div className={styles.info}>
                                      {parseInt(category as string) === 1 ? 'Mùa' : 'Phần'}: {film.seriesNo}
                                  </div>
                              </div>
                          ))}
            </div>
        </div>
    );
}

export default Similars;
