import { Detail, Media, Home, MediaParams } from 'models/loklok';
import loklokClient from './loklokClient';

const loklokApi = {
    getHome(page: number): Promise<Home> {
        return loklokClient.get(`homePage/getHome?page=${page}`);
    },

    getDetail(id: string, category: number): Promise<Detail> {
        return loklokClient.get('/movieDrama/get', {
            params: {
                id,
                category,
            },
        });
    },
    getMedia(params: MediaParams): Promise<Media> {
        return loklokClient.get('/media/previewInfo', {
            params,
        });
    },
};

export default loklokApi;
