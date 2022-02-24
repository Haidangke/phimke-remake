import useResize from 'hooks/useResize';
import { CircularProgress } from 'react-cssfx-loading';
import styles from './Loading.module.scss';

interface LoadingProps {
    space: number;
}

function Loading({ space }: LoadingProps) {
    const { onMobile } = useResize();
    return (
        <div style={{ height: `calc(100vh - ${space}px)` }} className={styles.root}>
            <CircularProgress
                style={{ marginBottom: space * 1.5 }}
                color='rgb(1, 180, 228)'
                width={onMobile ? '50px' : '60px'}
                height={onMobile ? '50px' : '60px'}
                duration='2s'
            />
        </div>
    );
}
export default Loading;
