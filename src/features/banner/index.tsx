import { Link } from 'react-router-dom';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Banner.module.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './Swiper.scss';
import { useQuery } from 'react-query';
import searchApi from 'apis/searchApi';
import Skeleton from 'react-loading-skeleton';

function Banner() {
    SwiperCore.use([Pagination]);
    const { data } = useQuery('banner', async () => await searchApi.searchLeaderBoard());

    if (data?.list.length === 0 || !data?.list) {
        return (
            <div className={styles.root}>
                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <Skeleton style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <Swiper
                    pagination
                    loop={true}
                    fadeEffect={{ crossFade: true }}
                    speed={500}
                    slidesPerView={1}
                    spaceBetween={18}
                >
                    {data?.list &&
                        data?.list.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <Link to={`/${banner.domainType}/${banner.id}`}>
                                    <div className={styles.item}>
                                        <img src={banner.cover} alt={banner.title} />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Banner;
