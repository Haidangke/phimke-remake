import { LazyLoadImage } from 'react-lazy-load-image-component';
import { resizeImage } from 'utils/resizeImage';
import styles from './ImageLazyLoad.module.scss';

interface ImageLazyLoadProps {
    name: string;
    coverVerticalUrl: string;
    size: string;
    horizontal?: boolean;
}

function ImageLazyLoad({ name, coverVerticalUrl, size }: ImageLazyLoadProps) {
    return (
        <>
            <div className={styles.overplay}></div>
            <LazyLoadImage
                className={styles.image}
                alt={name}
                src={resizeImage(coverVerticalUrl, size)}
                effect='opacity'
            />
        </>
    );
}

export default ImageLazyLoad;
