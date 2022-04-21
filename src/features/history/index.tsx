import TableFilm from 'components/TableFilm';
import { SearchResults } from 'models/search';
import styles from './History.module.scss';

function History() {
    const localData: SearchResults[] = JSON.parse(localStorage.getItem('history') as string) || [];

    if (!localData || localData.length === 0) {
        return (
            <div className={styles.root}>
                <div className={styles.error}>Bạn chưa xem bộ phim nào</div>
            </div>
        );
    }
    return (
        <div className={styles.root}>
            <div className={styles.title}>Danh sách các phim bạn đã xem</div>
            <TableFilm data={localData} />
        </div>
    );
}

export default History;
