import clsx from 'clsx';
import { ReactChild, ReactChildren, useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

import styles from './ItemFilter.module.scss';

interface ItemFilterProps {
    children: ReactChild | ReactChildren;
    title: string;
    onFilterProp: boolean;
}

function ItemFilter({ title, children, onFilterProp }: ItemFilterProps) {
    const [onFilter, setOnFilter] = useState(onFilterProp);
    return (
        <div className={styles.root}>
            <div className={styles.title} onClick={() => setOnFilter(!onFilter)}>
                {title}
                {onFilter ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </div>
            <div
                className={clsx(styles.main, {
                    [styles.isMain]: onFilter,
                })}
            >
                {children}
            </div>
        </div>
    );
}

export default ItemFilter;
