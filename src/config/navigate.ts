import { Config } from 'models/common';

interface Navigate {
    path: string;
    name: string;
}

export const navigate: Navigate[] = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/discover/movie',
        name: 'Movie',
    },
    {
        path: '/discover/tv',
        name: 'TV Show',
    },
];

export const navigateConfig: Config<Navigate>[] = [
    {
        language: 'en',
        data: [
            {
                path: '/',
                name: 'Home',
            },
            {
                path: '/discover/movie',
                name: 'Movie',
            },
            {
                path: '/discover/tv',
                name: 'TV Show',
            },
        ],
    },
    {
        language: 'vi',
        data: [
            {
                path: '/',
                name: 'Trang chủ',
            },
            {
                path: '/discover/movie',
                name: 'Phim chiếu rạp',
            },
            {
                path: '/discover/tv',
                name: 'Phim bộ',
            },
        ],
    },
];
