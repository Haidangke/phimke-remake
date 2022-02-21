import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { GoPrimitiveDot } from 'react-icons/go';

import styles from './Introduce.module.scss';
import Score from 'components/Score';
import Image from 'components/ImageLoading';
import { useAppSelector } from 'app/hooks';
import { isMobile, MobileView } from 'react-device-detect';
import { resizeImage } from 'utils/resizeImage';

function Introduce() {
    const { pathname } = useLocation();
    console.log();
    const { detail, background } = useAppSelector((state) => state.detail);
    return (
        <div className={styles.root}>
            <MobileView>
                <div className={styles.mobile}>
                    <div
                        className={styles.overplayMobile}
                        style={{
                            backgroundImage: `linear-gradient( to right, rgba(${background.color}, 1) 20%, rgba(${background.color}, 0) 50%)`,
                        }}
                    ></div>
                    <div className={styles.posterMobile}>
                        <Image
                            smallSrc={resizeImage(detail.coverVerticalUrl)}
                            largeSrc={detail.coverVerticalUrl}
                        />
                    </div>
                    <div className={styles.backdropMobile}>
                        <Image
                            smallSrc={resizeImage(detail.coverHorizontalUrl)}
                            largeSrc={detail.coverHorizontalUrl}
                        />
                    </div>
                </div>
            </MobileView>
            <div
                className={clsx(styles.wrapper, {
                    [styles.isDark]: background.isDark,
                })}
            >
                <div className={styles.backdrop}>
                    <div className={styles.image}>
                        <Image
                            smallSrc={resizeImage(detail.coverHorizontalUrl)}
                            largeSrc={detail.coverHorizontalUrl}
                        />
                    </div>
                </div>
                <div
                    className={styles.overplay}
                    style={{
                        backgroundImage: `linear-gradient( to right, rgba(${background.color}, 1) , rgba(${
                            background.color
                        },${isMobile ? 1 : 0.8}))`,
                    }}
                ></div>

                <div className={styles.content}>
                    <div className={styles.poster}>
                        <Image
                            smallSrc={resizeImage(detail.coverVerticalUrl)}
                            largeSrc={detail.coverVerticalUrl}
                        />
                    </div>

                    <div className={styles.info}>
                        <div className={styles.titleName}>
                            {detail.name}
                            <div className={styles.titleYear}>{`(${detail.year})`}</div>
                        </div>

                        <div className={styles.fact}>
                            <div className={styles.factTop}>
                                <div className={styles.certification}>{detail?.drameTypeVo?.drameType}</div>
                                <div className={styles.release}>
                                    <GoPrimitiveDot />
                                    {detail.year}
                                    <GoPrimitiveDot />
                                </div>
                            </div>

                            <ul className={styles.genres}>
                                {detail.tagList?.map((x) => (
                                    <li key={x.id} className={styles.itemGenres}>
                                        {x.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.action}>
                            <div className={styles.score}>
                                <Score
                                    vote_average={detail.score}
                                    textSize={isMobile ? 25 : 34}
                                    backgroundPadding={0}
                                />
                            </div>
                            <div className={styles.textScore}>User Score</div>
                            <Link to={`${pathname}/watchs`} className={styles.watchs}>
                                Xem phim
                            </Link>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.description}>
                                <div className={styles.overview}>{detail.introduction}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduce;