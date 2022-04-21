import { Link } from 'react-router-dom';
import { MdHistory } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import styles from './History.module.scss';

interface HistorySearchProps {
    history: string[];
    onRemove: (x: string) => any;
}

function HistorySearch({ history, onRemove }: HistorySearchProps) {
    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {history.map((x) => (
                    <div className={styles.item} key={x}>
                        <div className={styles.icon}>
                            <MdHistory />
                        </div>
                        <Link to={'/search/' + x} className={styles.name}>
                            {x}
                        </Link>
                        <div onClick={() => onRemove(x)} className={styles.cancel}>
                            <IoClose />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HistorySearch;
