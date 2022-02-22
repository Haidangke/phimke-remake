import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { navigate } from 'config/navigate';
import styles from './Sidebar.module.scss';
import useScroll from 'hooks/useScroll';

interface SidebarProps {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isShow, setIsShow }: SidebarProps) {
    const { result, y } = useScroll();
    const { pathname } = useLocation();

    return (
        <div
            className={clsx(styles.root, {
                [styles.show]: isShow,
                [styles.isDown]: !result && y > 100,
            })}
        >
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
    );
}

export default Sidebar;
