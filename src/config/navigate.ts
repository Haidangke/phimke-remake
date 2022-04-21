interface Navigate {
    path: string;
    name: string;
}

export const navigate: Navigate[] = [
    {
        path: '/',
        name: 'Khám phá',
    },
    {
        path: '/discover/1',
        name: 'Phim lẻ',
    },
    {
        path: '/discover/2',
        name: 'Phim bộ',
    },
    {
        path: '/discover/3',
        name: 'Anime',
    },
    {
        path: '/history',
        name: 'Lịch sử xem',
    },
];
