import { LazyLoadImage } from 'react-lazy-load-image-component';
import { verticalSize } from 'utils/resizeImage';
import styles from './ImageLazyLoad.module.scss';

interface ImageLazyLoadProps {
    name: string;
    coverVerticalUrl: string;
    size: number;
    horizontal?: boolean;
}

function ImageLazyLoad({ name, coverVerticalUrl, size }: ImageLazyLoadProps) {
    return (
        <>
            <div className={styles.overplay}></div>
            <LazyLoadImage
                className={styles.image}
                alt={name}
                src={verticalSize(coverVerticalUrl, size)}
                effect='opacity'
            />
        </>
    );
}

export default ImageLazyLoad;
