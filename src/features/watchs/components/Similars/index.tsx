import styles from './Similars.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { RefList } from 'models/loklok';
import { verticalSize } from 'utils/resizeImage';

interface SimilarsProps {
    isLoading: boolean;
    data: RefList;
}

function Similars({ data, isLoading }: SimilarsProps) {
    const { id, category } = useParams();
    const navigate = useNavigate();

    if (data.length === 0) {
        return <div></div>;
    }

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
                              <div
                                  onClick={() => navigate(`/${film.category}/${film.id}`)}
                                  key={film.id}
                                  className={styles.item}
                              >
                                  <img alt={film.name} src={verticalSize(film.coverVerticalUrl, 300)} />
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
