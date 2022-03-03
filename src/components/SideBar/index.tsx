import { Dispatch, SetStateAction, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { navigate } from 'config/navigate';
import styles from './Sidebar.module.scss';
import useScroll from 'hooks/useScroll';
import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/auth/authSlice';
import { auth } from 'Firebase/config';

interface SidebarProps {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isShow, setIsShow }: SidebarProps) {
    const history = useNavigate();
    const { result, y } = useScroll();
    const { pathname } = useLocation();
    const { isLoggedIn, user } = useAppSelector(authSelector);
    const { photoURL, displayName } = user;
    const sidebarRef = useRef(null);

    const handleLogout = () => {
        auth.signOut();
    };
    return (
        <>
            {isShow && <div onClick={() => setIsShow(false)} className={styles.overplay}></div>}
            <div
                ref={sidebarRef}
                className={clsx(styles.root, {
                    [styles.show]: isShow,
                    [styles.isDown]: !result && y > 100,
                })}
            >
                <div className={styles.auth}>
                    {isLoggedIn && (
                        <div className={styles.info}>
                            <img className={styles.avatar} src={photoURL} alt={displayName} />
                            <div className={styles.name}>{displayName}</div>
                        </div>
                    )}

                    {isLoggedIn ? (
                        <div className={styles.status} onClick={handleLogout}>
                            Đăng xuất
                        </div>
                    ) : (
                        <div className={styles.status} onClick={() => history('/login')}>
                            Đăng nhập
                        </div>
                    )}
                </div>

                <div className={styles.list}>
                    {navigate.map((item) => (
                        <Link
                            onClick={() => setIsShow(false)}
                            key={item.name}
                            to={item.path}
                            className={clsx(styles.item, {
                                [styles.itemActive]: item.path === pathname,
                            })}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
