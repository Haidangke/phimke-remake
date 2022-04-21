import { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import ReactLoading from 'react-loading';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import Player from 'features/watchs/components/Player';
import { fetchData } from 'features/watchs/watchsSlice';
import styles from './Media.module.scss';

function Media() {
    const dispatch = useAppDispatch();

    const { category } = useParams();
    const { detail } = useAppSelector((state) => state.detail);
    const { media, isLoading, isError } = useAppSelector((state) => state.watchs);

    const [searchParams, setSearchParams] = useSearchParams();
    const [definition, setDefinition] = useState('');
    const episode = parseInt(searchParams.get('episode') || '0') || 0;

    const cdtEpisode = useCallback(
        (episode: number) =>
            episode + 1 <= detail.episodeVo.length && episode >= 0 && typeof episode === 'number',
        [detail?.episodeVo?.length]
    );

    useEffect(() => {
        setDefinition('');
    }, [episode]);

    useEffect(() => {
        if ((detail.episodeVo, detail.id)) {
            if (!cdtEpisode(episode)) {
                setSearchParams({ episode: '0' });
            }
            dispatch(
                fetchData({
                    category,
                    definition: definition || detail.episodeVo[episode]?.definitionList[0].code,
                    contentId: detail.id,
                    episodeId: detail.episodeVo[episode]?.id,
                })
            );
        }
    }, [category, episode, detail.episodeVo, detail.id, dispatch, setSearchParams, cdtEpisode, definition]);

    const subs =
        detail?.episodeVo?.length > 0 && cdtEpisode(episode)
            ? detail.episodeVo[episode].subtitlingList.map((x) => ({
                  label: x.language,
                  kind: 'subtitles',
                  src: 'https://srt-to-vtt.vercel.app?url=' + x.subtitlingUrl,
                  srcLang: x.languageAbbr,
              }))
            : [];

    const indexSub =
        detail?.episodeVo?.length > 0 && cdtEpisode(episode)
            ? detail?.episodeVo[episode]?.subtitlingList
                  .map((subtitling) => subtitling.languageAbbr)
                  .indexOf('vi')
            : 0;

    return (
        <Fragment>
            {isLoading ? (
                <div className={styles.player}>
                    <ReactLoading type='bars' color='#fff' className={styles.loading} />
                </div>
            ) : (
                <Player url={media.mediaUrl} subs={subs} indexSub={indexSub} />
            )}

            {/* <div className={styles.clickError}>
                Chú ý: Nếu phim không xem được hoặc thời gian load trên 15s, vui lòng nhấn
                <span
                    onClick={() =>
                        dispatch(
                            fetchData({
                                category,
                                definition: definition || detail.episodeVo[episode]?.definitionList[0].code,
                                contentId: detail.id,
                                episodeId: detail.episodeVo[episode]?.id,
                            })
                        )
                    }
                >
                    Vào đây
                </span>
            </div> */}

            {detail.category === 1 &&
                detail.id &&
                cdtEpisode(episode) &&
                (!isError ? (
                    <>
                        <div className={styles.titleEpisode}>Các tập</div>
                        <div className={styles.episodes}>
                            {detail?.episodeVo?.length > 0 &&
                                detail.episodeVo.map((item, index) => (
                                    <div
                                        onClick={() => {
                                            setSearchParams({ episode: index.toString() });
                                        }}
                                        key={item.id}
                                        className={clsx(styles.episode, {
                                            [styles.episodeActive]: index === episode,
                                        })}
                                    >
                                        Tập {index + 1}
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <div className={styles.episodes}>Không tìm thấy dữ liệu phù hợp (Error Code: 404)</div>
                ))}
        </Fragment>
    );
}

export default Media;
