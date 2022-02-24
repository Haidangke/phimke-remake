import { RecommendContentVO } from 'models/loklok';
import ItemFilm from './ItemFilm';
import styles from './ListFilm.module.scss';

interface ListFilmProps {
    data?: RecommendContentVO[];
    title?: string;
}

function ListFilm({ data, title }: ListFilmProps) {
    const length = data?.length as number;
    if (length <= 2 || (data && !data[0].category)) return <div></div>;
    return (
        <div className={styles.root}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.list}>
                {data?.map((item) => (
                    <ItemFilm key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ListFilm;
