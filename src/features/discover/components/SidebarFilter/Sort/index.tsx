import { useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    filtersMovieSelector,
    filtersTvSelector,
    setFilterMovie,
    setFilterTv,
} from 'features/discover/discoverSlice';
import ItemFilter from '../../ItemFilter';
import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './Sort.module.scss';

interface SortProps {
    media: string;
}

function Sort({ media }: SortProps) {
    const dispatch = useAppDispatch();
    const [isListSort, setIsListSort] = useState(false);

    // const listSort = media === 'movie' ? sortMovie : sortTv;

    const filtersMovie = useAppSelector(filtersMovieSelector);
    const filtersTv = useAppSelector(filtersTvSelector);
    // const sortName = listSort.filter(
    //     (sort) => sort.value === (media === 'movie' ? filtersMovie.sort_by : filtersTv.sort_by)
    // )[0].name;

    // const activeItem = (name: string) => {
    //     return name === sortName;
    // };

    const handleSetSort = (value: string) => {
        dispatch(
            media === 'movie'
                ? setFilterMovie({ ...filtersMovie, sort_by: value })
                : setFilterTv({ ...filtersTv, sort_by: value })
        );
        setIsListSort(false);
    };

    return (
        <ItemFilter title='Sort' onFilterProp>
            <div className={styles.root}>
                <div className={styles.title}>Sắp xếp kết quả theo:</div>
                <div className={styles.main}>
                    <div className={styles.header} onClick={() => setIsListSort(!isListSort)}>
                        {/* {sortName} */}
                        <IoMdArrowDropdown />
                    </div>
                    {isListSort && (
                        <div className={styles.list}>
                            <div className={styles.listWrapper}>
                                {/* {listSort.map((sort) => (
                                    <div
                                        className={clsx(styles.item, {
                                            [styles.itemActive]: activeItem(sort.name),
                                        })}
                                        key={sort.value}
                                        onClick={() => handleSetSort(sort.value)}
                                    >
                                        {sort.name}
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ItemFilter>
    );
}

export default Sort;
