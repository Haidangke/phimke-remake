import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const loklokClient = axios.create({
    baseURL: 'https://ga-mobile-api.loklok.tv/cms/app',
    headers: {
        lang: 'vi',
        versioncode: '11',
        clienttype: 'ios_jike_default',
    },
});

loklokClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    return config;
});

loklokClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default loklokClient;
