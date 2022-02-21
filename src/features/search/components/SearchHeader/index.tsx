import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import ReactLoading from 'react-loading';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import useScroll from 'hooks/useScroll';
import { fetchSearch, fetchSearchSuccess, setIsSearch } from 'features/search/searchSlice';

import styles from './SearchHeader.module.scss';
import { resizeImage } from 'utils/resizeImage';
import { SearchWithKeyword } from 'models/search';

function SearchHeader() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { result, y } = useScroll();
    const inputRef = useRef<HTMLInputElement>(null);
    const { listWithKeyword, query, isLoading, isSearch } = useAppSelector((state) => state.search);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        dispatch(fetchSearch(query));
    };

    const handleNavigate = () => {
        navigate(`search/${query}`);
        dispatch(setIsSearch(false));
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleNavigate();
        }
    };

    const handleClearKeyword = () => {
        dispatch(fetchSearch(''));
        dispatch(fetchSearchSuccess({} as SearchWithKeyword));
    };

    useEffect(() => {
        if (isSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearch]);

    return (
        <div
            className={clsx(styles.root, {
                [styles.isDown]: !result && y > 100,
            })}
        >
            <div className={styles.input}>
                <div className={styles.inputWrapper}>
                    <IoIosSearch />
                    <input
                        autoFocus
                        ref={inputRef}
                        value={query}
                        onKeyDown={handleKeyDown}
                        onChange={handleOnChange}
                        type='text'
                        placeholder='Search for a movie, tv show, person...'
                        className={styles.inputTag}
                    />
                    {isLoading ? (
                        <ReactLoading type='spin' color='rgba(0, 0, 0, 0.2)' height='20px' width='20px' />
                    ) : (
                        <IoClose onClick={handleClearKeyword} />
                    )}
                </div>
            </div>
            <div className={styles.wrapper}>
                {listWithKeyword?.searchResults && (
                    <div className={styles.list}>
                        {listWithKeyword?.searchResults?.map((film) => (
                            <div key={film.id} className={styles.item}>
                                <Link
                                    onClick={() => dispatch(setIsSearch(false))}
                                    to={`/${film.domainType}/${film.id}`}
                                    className={styles.itemWrapper}
                                >
                                    <div className={styles.image}>
                                        <img
                                            src={resizeImage(film.coverHorizontalUrl, '200')}
                                            alt={film.name}
                                        />
                                    </div>

                                    <div className={styles.itemRight}>
                                        <div className={styles.name}>
                                            {film.name} ( {film.releaseTime} )
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <div onClick={() => handleNavigate()} className={styles.button}>
                            <div className={styles.buttonWrapper}>View all results</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchHeader;