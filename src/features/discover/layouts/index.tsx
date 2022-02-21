import { Result } from 'models/common';
import { useLocation } from 'react-router-dom';

import FilmCollection from '../components/FilmCollection';
import Paginate from '../components/Paginate';
import SidebarFilter from '../components/SidebarFilter';
import styles from './LayoutDiscover.module.scss';

interface LayoutDiscoverProps {
    filmCollection?: Result[];
    isLoading: boolean;
    pageCount?: number;
}

function LayoutDiscover({ filmCollection, isLoading, pageCount }: LayoutDiscoverProps) {
    const { pathname } = useLocation();
    const media = pathname.split('/')[pathname.split('/').length - 1];

    return (
        <div className='root'>
            <div className={styles.title}>{media === 'movie' ? 'Movie' : 'TV Shows'} Discover</div>
            <div className={styles.main}>
                <div className={styles.left}>
                    <SidebarFilter media={media} />
                </div>
                <div className={styles.right}>
                    <FilmCollection filmCollection={filmCollection} isLoading={isLoading} media={media} />
                    <Paginate pageCount={pageCount} media={media} />
                </div>
            </div>
        </div>
    );
}

export default LayoutDiscover;
