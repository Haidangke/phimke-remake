import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdHistory } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import styles from './History.module.scss';
import { setIsSearch } from 'features/search/searchSlice';

interface HistorySearchProps {
    history: string[];
    onRemove: (x: string) => any;
    onReplace: (x: string) => any;
}

function HistorySearch({ history, onRemove, onReplace }: HistorySearchProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearchHistory = (keyword: string) => {
        onReplace(keyword);
        dispatch(setIsSearch(false));
        navigate('/search/' + keyword);
    };

    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {history.map((x) => (
                    <div className={styles.item} key={x}>
                        <div className={styles.icon}>
                            <MdHistory />
                        </div>
                        <div onClick={() => handleSearchHistory(x)} className={styles.name}>
                            {x}
                        </div>
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
