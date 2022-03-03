import { useQuery } from 'react-query';
import searchApi from 'apis/searchApi';
import ItemFilter from '../ItemFilter';
import styles from './Filter.module.scss';
import Skeleton from 'react-loading-skeleton';

interface FilterProps {
    id: number;
}

function Filter({ id }: FilterProps) {
    const { data } = useQuery('filters', async () => await searchApi.searchConfig());

    if (!data)
        return (
            <div className={styles.root}>
                {Array(5)
                    .fill(1)
                    .map((item, index) => (
                        <Skeleton
                            key={index}
                            containerClassName={styles.wrapLoading}
                            className={styles.itemLoading}
                        />
                    ))}
            </div>
        );
    return (
        <div className={styles.root}>
            {data[id - 1].screeningItems.map((item, index) => (
                <ItemFilter key={index} filter={item} id={id} />
            ))}
        </div>
    );
}

export default Filter;
