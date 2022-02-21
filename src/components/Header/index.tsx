import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { IoClose, IoSearchSharp } from 'react-icons/io5';
import clsx from 'clsx';

import styles from './Header.module.scss';
import { navigateConfig } from 'config/navigate';
import Sidebar from 'components/SideBar';
import useScroll from 'hooks/useScroll';
import useOnClickOutside from 'hooks/useOnClickOutside';
import SearchHeader from 'features/search/components/SearchHeader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsSearch } from 'features/search/searchSlice';
import Auth from 'features/auth';
import { languageSelector } from 'features/setting/settingSlice';

function Header() {
    const language = useAppSelector(languageSelector);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const [isShow, setIsShow] = useState<boolean>(false);
    const { isSearch } = useAppSelector((state) => state.search);
    const { result, y } = useScroll();
    const ref = useRef(null);

    const isLittleWrap = Boolean(!pathname.split('/')[1]);

    useOnClickOutside(ref, () => setIsShow(false));

    const handleSearch = () => {
        dispatch(setIsSearch(true));
    };

    return (
        <header className={styles.header}>
            <div
                className={clsx(styles.root, {
                    [styles.isDown]: !result && y > 100,
                })}
            >
                <div
                    className={clsx(styles.wrapper, {
                        [styles.isLittleWrap]: isLittleWrap,
                    })}
                >
                    <div className={styles.menu} ref={ref}>
                        <GrMenu onClick={() => setIsShow(!isShow)} />
                        <Sidebar isShow={isShow} setIsShow={setIsShow} />
                    </div>
                    <div className={styles.left}>
                        <div className={styles.logo}>
                            <Link to='/'>phimke</Link>
                        </div>
                        <div className={styles.navigate}>
                            {navigateConfig
                                .filter((item) => item.language === language)[0]
                                .data.map((item) => (
                                    <Link
                                        key={item.path}
                                        className={clsx(styles.navigateItem, {
                                            [styles.navigateItemActive]: item.path === pathname,
                                        })}
                                        to={item.path}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.auth}>
                            <Auth />
                        </div>
                        <div className={styles.search}>
                            {!isSearch ? (
                                <IoSearchSharp onClick={handleSearch} />
                            ) : (
                                <IoClose onClick={() => dispatch(setIsSearch(false))} />
                            )}
                            <div className={clsx(styles.searchContent, { [styles.isSearch]: isSearch })}>
                                <SearchHeader />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
