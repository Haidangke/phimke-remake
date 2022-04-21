import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import ReactLoading from 'react-loading';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import useScroll from 'hooks/useScroll';
import { fetchSearch, fetchSearchSuccess, setIsSearch } from 'features/search/searchSlice';

import styles from './SearchHeader.module.scss';
import { verticalSize } from 'utils/resizeImage';
import { SearchWithKeyword } from 'models/search';
import HistorySearch from './History';

function SearchHeader() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { result, y } = useScroll();
    const inputRef = useRef<HTMLInputElement>(null);
    const { listWithKeyword, query, isLoading, isSearch, isFetched } = useAppSelector(
        (state) => state.search
    );

    const [localCache, setLocalCache] = useState<string[]>(
        JSON.parse(localStorage.getItem('search_history') as string) || []
    );

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        dispatch(fetchSearch(query));
    };

    const handleNavigate = () => {
        if (query) {
            navigate(`search/${query}`);
            dispatch(setIsSearch(false));

            const localData: string[] = JSON.parse(localStorage.getItem('search_history') as string) || [];
            if (localData.some((x) => x === query)) {
                localData.splice(localData.indexOf(query), 1);
            }
            if (localData.length === 10) {
                localData.pop();
            }
            localData.unshift(query);
            setLocalCache(localData);
            localStorage.setItem('search_history', JSON.stringify(localData));
        }
    };

    const handleRemoveHistory = (query: string) => {
        const newLocalData = [...localCache];
        newLocalData.splice(localCache.indexOf(query), 1);
        setLocalCache(newLocalData);

        localStorage.setItem('search_history', JSON.stringify(newLocalData));
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
                        placeholder='Tìm phim điện ảnh, truyền hình,...'
                        className={styles.inputTag}
                    />
                    {isLoading ? (
                        <ReactLoading type='spin' color='rgba(0, 0, 0, 0.2)' height='20px' width='20px' />
                    ) : (
                        query && <IoClose onClick={handleClearKeyword} />
                    )}
                </div>
            </div>
            {!query ? (
                localCache.length === 0 ? (
                    <div className={styles.wrapper}>
                        <div className={styles.notQuery}>Vui lòng nhập từ khóa để tìm kiếm !</div>
                    </div>
                ) : (
                    <HistorySearch history={localCache} onRemove={handleRemoveHistory} />
                )
            ) : (
                <div className={styles.wrapper}>
                    {listWithKeyword?.searchResults?.length === 0 && isFetched && (
                        <div className={styles.notData}>Không tìm thấy phim trùng khớp !</div>
                    )}
                    {listWithKeyword?.searchResults?.length > 0 && (
                        <div className={styles.list}>
                            {listWithKeyword?.searchResults.slice(0, 6).map((film) => (
                                <div key={film?.id} className={styles.item}>
                                    <Link
                                        onClick={() => dispatch(setIsSearch(false))}
                                        to={`/${film?.domainType}/${film?.id}`}
                                        className={styles.itemWrapper}
                                    >
                                        <div className={styles.image}>
                                            <img
                                                src={verticalSize(film.coverVerticalUrl, 150)}
                                                alt={film?.name}
                                            />
                                        </div>

                                        <div className={styles.itemRight}>
                                            <div className={styles.name}>
                                                {film?.name} ( {film?.releaseTime} )
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {listWithKeyword?.searchResults?.length > 7 && (
                                <div onClick={() => handleNavigate()} className={styles.button}>
                                    <div className={styles.buttonWrapper}>Xem tất cả</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchHeader;
