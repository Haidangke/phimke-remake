import { useAppDispatch, useAppSelector } from 'app/hooks';
import clsx from 'clsx';
import {
    filtersMovieSelector,
    filtersTvSelector,
    setFilterMovie,
    setFilterTv,
} from 'features/discover/discoverSlice';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import ItemFilter from '../../ItemFilter';
import styles from './Filter.module.scss';

interface FilterProps {
    media?: string;
}

function Filter({ media }: FilterProps) {
    const dispatch = useAppDispatch();
    const [isList, setIsList] = useState(false);
    // const genresConfig = media === 'movie' ? genresMovie : genresTv;
    const filterMovie = useAppSelector(filtersMovieSelector);
    const filterTv = useAppSelector(filtersTvSelector);

    const genresStore = media === 'movie' ? filterMovie.with_genres : filterTv.with_genres;
    const filterYear = media === 'movie' ? filterMovie.primary_release_year : filterTv.first_air_date_year;

    const year = new Date().getFullYear();
    const listYear: Array<{ name: any; value: any }> = [{ name: 'Tất cả', value: 0 }];
    for (let i = year; i > year - 20; i--) {
        listYear.push({ name: i, value: i });
    }

    const handleSetYear = (year: any) => {
        if (media === 'movie') {
            dispatch(setFilterMovie({ ...filterMovie, primary_release_year: year }));
        } else {
            dispatch(setFilterTv({ ...filterTv, first_air_date_year: year }));
        }
        setIsList(false);
    };

    const activeItem = (year: any) => {};

    const handleAddGenres = (idGenres: string) => {
        if (media === 'movie') {
            const genres = genresStore?.split(',');
            if (genres?.includes(idGenres)) {
                const index = genres.indexOf(idGenres);
                genres.splice(index, 1);

                dispatch(
                    setFilterMovie({
                        ...filterMovie,
                        with_genres: genres.join(','),
                    })
                );
            } else {
                dispatch(
                    setFilterMovie({
                        ...filterMovie,
                        with_genres: genresStore + (genresStore ? ',' : '') + idGenres,
                    })
                );
            }
        } else {
            const genres = genresStore?.split(',');
            if (genres?.includes(idGenres)) {
                const index = genres.indexOf(idGenres);
                genres.splice(index, 1);

                dispatch(
                    setFilterTv({
                        ...filterTv,
                        with_genres: genres.join(','),
                    })
                );
            } else {
                dispatch(
                    setFilterTv({
                        ...filterTv,
                        with_genres: genresStore + (genresStore ? ',' : '') + idGenres,
                    })
                );
            }
        }
    };

    return (
        <ItemFilter title='Filter' onFilterProp={false}>
            <div className={styles.root}>
                <div className={styles.item}>
                    <div className={styles.titleYear}>Năm phát hành</div>
                    <div className={styles.mainYear}>
                        <div className={styles.headerYear} onClick={() => setIsList(!isList)}>
                            {listYear.filter((year) => year.value === filterYear)[0].name}
                            <IoMdArrowDropdown />
                        </div>
                        {isList && (
                            <div className={styles.listYear}>
                                <div className={styles.listWrapperYear}>
                                    {listYear.map((year) => (
                                        <div
                                            className={clsx(styles.itemYear, {
                                                [styles.itemActiveYear]: activeItem(year.name),
                                            })}
                                            key={year.value}
                                            onClick={() => handleSetYear(year.value)}
                                        >
                                            {year.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>Thể loại</div>
                    <div className={styles.main}>
                        <div className={styles.genres}>
                            {/* {genresConfig.map((genre) => (
                                <div
                                    key={genre.id}
                                    onClick={() => handleAddGenres(genre.id)}
                                    className={clsx(styles.itemGenres, {
                                        [styles.itemGenresActive]: genresStore?.includes(genre.id),
                                    })}
                                >
                                    {genre.name}
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
            </div>
        </ItemFilter>
    );
}

export default Filter;
