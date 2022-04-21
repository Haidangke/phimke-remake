import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { GoPrimitiveDot } from 'react-icons/go';

import styles from './Introduce.module.scss';
import Score from 'components/Score';
import Image from 'components/ImageLoading';
import { useAppSelector } from 'app/hooks';
import { verticalSize, horizontalSize } from 'utils/resizeImage';
import useResize from 'hooks/useResize';
import { dramaTypes } from 'config/dramaType';
import { SearchResults } from 'models/search';

function Introduce() {
    const { pathname } = useLocation();
    const { onMobile } = useResize();
    const { detail, background } = useAppSelector((state) => state.detail);
    const navigate = useNavigate();

    const handleToType = (drameType: string) => {
        const duplicate = dramaTypes.filter((item) => item.name.includes(drameType));
        if (duplicate.length > 0) {
            navigate(duplicate[0].page);
        }
    };

    const handleAddHistory = () => {
        const data: SearchResults = {
            coverVerticalUrl: detail.coverVerticalUrl,
            domainType: detail.category,
            id: detail.id.toString(),
            name: detail.name,
        };

        const localData: SearchResults[] = JSON.parse(localStorage.getItem('history') as string) || [];

        if (!localData?.map((x) => x.id).some((x) => x === data.id)) {
            if (localData.length === 100) {
                localData.pop();
            }
            localData.unshift(data);
            localStorage.setItem('history', JSON.stringify(localData));
        }
        navigate(`${pathname}/watchs`);
    };

    return (
        <div className={styles.root}>
            <div className={styles.mobile}>
                <div
                    className={styles.overplayMobile}
                    style={{
                        backgroundImage: `linear-gradient( to right, rgba(${background.color}, 1) 20%, rgba(${background.color}, 0) 50%)`,
                    }}
                ></div>
                <div className={styles.posterMobile}>
                    <Image
                        smallSrc={verticalSize(detail.coverVerticalUrl, 500)}
                        largeSrc={detail.coverVerticalUrl}
                    />
                </div>
                <div className={styles.backdropMobile}>
                    <Image
                        smallSrc={horizontalSize(detail.coverHorizontalUrl, 800)}
                        largeSrc={detail.coverHorizontalUrl}
                    />
                </div>
            </div>

            <div
                className={clsx(styles.wrapper, {
                    [styles.isDark]: background.isDark,
                })}
            >
                <div className={styles.backdrop}>
                    <div className={styles.image}>
                        <Image
                            smallSrc={horizontalSize(detail.coverHorizontalUrl, 800)}
                            largeSrc={detail.coverHorizontalUrl}
                        />
                    </div>
                </div>
                <div
                    className={styles.overplay}
                    style={{
                        backgroundImage: `linear-gradient( to right, rgba(${background.color}, 1) , rgba(${
                            background.color
                        },${onMobile ? 1 : 0.8}))`,
                    }}
                ></div>

                <div className={styles.content}>
                    <div className={styles.poster}>
                        <Image
                            smallSrc={verticalSize(detail.coverVerticalUrl, 500)}
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
                                <div
                                    className={styles.certification}
                                    onClick={() => handleToType(detail?.drameTypeVo?.drameType)}
                                >
                                    {detail?.drameTypeVo?.drameType}
                                </div>
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
                                    textSize={onMobile ? 25 : 34}
                                    backgroundPadding={0}
                                />
                            </div>
                            <div className={styles.textScore}>User Score</div>
                            <div onClick={handleAddHistory} className={styles.watchs}>
                                Xem phim
                            </div>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.description}>
                                <div className={styles.titleOverview}>Tóm tắt</div>
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
