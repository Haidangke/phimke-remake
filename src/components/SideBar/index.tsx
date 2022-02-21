import { navigate } from 'config/navigate';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import clsx from 'clsx';
import useScroll from 'hooks/useScroll';

interface Props {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isShow, setIsShow }: Props): ReactElement {
    const { result, y } = useScroll();

    return (
        <div
            className={clsx(styles.root, {
                [styles.show]: isShow,
                [styles.isDown]: !result && y > 100,
            })}
        >
            <div className={styles.list}>
                {navigate.map((x) => (
                    <Link onClick={() => setIsShow(false)} key={x.name} to={x.path} className={styles.item}>
                        {x.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
