import { CircularProgress } from 'react-cssfx-loading';
import styles from './Loading.module.scss';
import { isMobile } from 'react-device-detect';

interface LoadingProps {
    space: number;
}

function Loading({ space }: LoadingProps) {
    return (
        <div style={{ height: `calc(100vh - ${space}px)` }} className={styles.root}>
            <CircularProgress
                style={{ marginBottom: space * 1.5 }}
                color='rgb(1, 180, 228)'
                width={isMobile ? '50px' : '60px'}
                height={isMobile ? '50px' : '60px'}
                duration='2s'
            />
        </div>
    );
}
export default Loading;
