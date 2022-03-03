export const verticalSize = (src: string, size: number) =>
    src +
    `?imageView2/1/w/${size}/h/${
        size * (532 / 380)
    }/format/webp/interlace/1/ignore-error/1/q/90!/format/webp`;

export const horizontalSize = (src: string, size: number) =>
    src + `?imageView2/1/w/${size * 1.78}/h/${size}/format/webp/interlace/1/ignore-error/1/q/90!/format/webp`;
