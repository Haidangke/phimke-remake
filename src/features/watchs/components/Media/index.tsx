import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    const [curEpisode, setCurEpisode] = useState(0);
    const [definition, setDefinition] = useState('GROOT_HD');

    useEffect(() => {
        if ((detail.episodeVo, detail.id)) {
            dispatch(
                fetchData({
                    category,
                    definition,
                    contentId: detail.id,
                    episodeId: detail.episodeVo[curEpisode].id,
                })
            );
        }
    }, [category, curEpisode, definition, detail.episodeVo, detail.id, dispatch]);

    const subs =
        detail?.episodeVo?.length > 0
            ? detail.episodeVo[curEpisode].subtitlingList.map((x) => ({
                  label: x.language,
                  kind: 'subtitles',
                  src: 'https://srt-to-vtt.vercel.app?url=' + x.subtitlingUrl,
                  srcLang: x.languageAbbr,
              }))
            : [];

    const indexSub =
        detail?.episodeVo?.length > 0
            ? detail?.episodeVo[curEpisode]?.subtitlingList
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
                <Player
                    url={media.mediaUrl}
                    subs={subs}
                    indexSub={indexSub}
                    definitionList={detail?.episodeVo[curEpisode]?.definitionList}
                    setDefinition={setDefinition}
                    curDefinition={definition}
                />
            )}

            {detail.category === 1 &&
                (!isError ? (
                    <>
                        <div className={styles.titleEpisode}>Các tập</div>
                        <div className={styles.episodes}>
                            {detail?.episodeVo?.length > 0 &&
                                detail.episodeVo.map((episode, index) => (
                                    <div
                                        onClick={() => setCurEpisode(index)}
                                        key={episode.id}
                                        className={clsx(styles.episode, {
                                            [styles.episodeActive]: index === curEpisode,
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
