import { useAppSelector } from 'app/hooks';
import clsx from 'clsx';
import { setFilterAnime, setFilterMovie, setFilterTv } from 'features/discover/discoverSlice';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { ScreeningItems } from 'models/search';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTitleFilter } from 'utils/changeTitleFilter';
import styles from './ItemFilter.module.scss';

interface ItemFilterProps {
    filter: ScreeningItems;
    id: number;
}

function ItemFilter({ filter, id }: ItemFilterProps) {
    const filterMovie = useAppSelector((state) => state.discover.movie.filter);
    const filterTv = useAppSelector((state) => state.discover.tv.filter);
    const filterAnime = useAppSelector((state) => state.discover.anime.filter);

    const dispatch = useDispatch();
    const ref = useRef(null);
    const [isShow, setIsShow] = useState(false);
    const setFilter = (params: string, screeningType: string) => {
        setIsShow(false);
        dispatch(
            id === 1
                ? setFilterMovie({
                      ...filterMovie,
                      sort: '',
                      [`${screeningType}`]: params,
                  })
                : id === 2
                ? setFilterTv({ ...filterTv, sort: '', [`${screeningType}`]: params })
                : setFilterAnime({ ...filterAnime, sort: '', [`${screeningType}`]: params })
        );
    };

    useOnClickOutside(ref, () => setIsShow(false));

    const filterData = id === 1 ? filterMovie : id === 2 ? filterTv : filterAnime;

    return (
        <div className={styles.root} ref={ref}>
            <div onClick={() => setIsShow(!isShow)} className={styles.title}>
                {changeTitleFilter(
                    filterData[`${filter.items[0].screeningType}`]
                        ? filter.items.filter(
                              (x) => x.params === filterData[`${filter.items[0].screeningType}`]
                          )[0]?.name
                        : filter.items[0].name
                )}
            </div>
            {isShow && (
                <div className={styles.list}>
                    {filter.items
                        .filter((item) => item.params !== '65')
                        .map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setFilter(item.params, item.screeningType)}
                                className={clsx(styles.item, {
                                    [styles.itemActive]: item.params === filterData[item.screeningType],
                                })}
                            >
                                {changeTitleFilter(item.name)}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default ItemFilter;
