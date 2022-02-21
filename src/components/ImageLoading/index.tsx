import React, { memo, useState } from 'react';
import clsx from 'clsx';
import styles from './Image.module.scss';

interface ImageLoadingProps {
    smallSrc: any;
    largeSrc: any;
    borderRadius?: number;
    isHight?: boolean;
}

function ImageLoading({ smallSrc, largeSrc, borderRadius, isHight }: ImageLoadingProps) {
    const [isSmallImageLoaded, loadSmallImage] = useState(false);
    const [isLargeImageLoaded, loadLargeImage] = useState(false);

    const handleSmallImageLoad = () => loadSmallImage(true);
    const handleLargeImageLoad = () => loadLargeImage(true);

    return (
        <div style={{ borderRadius: borderRadius + 'px' }} className={styles.root}>
            <img
                src={smallSrc}
                className={clsx(styles.image, styles.image__loading, {
                    [styles.image__loaded]: isSmallImageLoaded,
                })}
                alt='poster'
                onLoad={handleSmallImageLoad}
            />
            <div style={{ paddingBottom: isHight ? '150%' : '66.6%' }} />
            <img
                src={largeSrc}
                className={clsx(styles.image, { [styles.image__loaded]: isLargeImageLoaded })}
                alt='backdrop'
                onLoad={handleLargeImageLoad}
            />
        </div>
    );
}

export default memo(ImageLoading);
