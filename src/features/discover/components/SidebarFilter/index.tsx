import Sort from './Sort';
import styles from './SidebarFilter.module.scss';
import Filter from './Filter';

interface SidebarFilterProps {
    media: string;
}

function SidebarFilter({ media }: SidebarFilterProps) {
    return (
        <div className={styles.root}>
            <Sort media={media} />
            <Filter media={media} />
        </div>
    );
}

export default SidebarFilter;
