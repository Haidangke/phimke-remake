import { useAppSelector } from 'app/hooks';

import Comment from 'features/comment';
import Similars from './components/Similars';
import styles from './Watchs.module.scss';
import Media from './components/Media';
import searchApi from 'apis/searchApi';
import TableFilm from 'components/TableFilm';
import NotFound from 'components/NotFound';
import { useEffect, useState } from 'react';
import { AdvancedSearch } from 'models/search';
import TableFilmLoading from 'components/TableFilm/TableFilmLoading';
import useResize from 'hooks/useResize';
import clsx from 'clsx';

function Watchs() {
    const { onPc } = useResize();
    const { detail, isLoading, isError } = useAppSelector((state) => state.detail);
    const [similars, setSimilars] = useState<AdvancedSearch>();

    useEffect(() => {
        (async function () {
            if (detail.id) {
                const response = await searchApi.advancedSearch({
                    size: 10,
                    params: detail.drameTypeVo?.drameType,
                    area: detail.areaList.map((x) => x.id).join(','),
                    category: detail.tagList.map((x) => x.id).join(','),
                    year: `${detail.year - 6},${detail.year}`,
                    subtitles: '',
                    order: 'up',
                });
                setSimilars(response);
            }
        })();
    }, [detail.areaList, detail.drameTypeVo?.drameType, detail.id, detail.tagList, detail.year]);

    if (isError) return <NotFound />;
    return (
        <div className={clsx(styles.root)}>
            <div className={styles.name}>
                {detail.seriesNo
                    ? detail.name +
                      ' ( ' +
                      (detail.category === 1 ? 'Mùa ' : 'Phần ') +
                      detail.seriesNo +
                      ' )'
                    : detail.name}
            </div>
            <div className={styles.media}>{<Media />}</div>
            <div className={styles.main}>
                <div className={styles.left}>{detail.id && onPc && <Comment filmId={detail.id} />}</div>
                <div className={styles.right}>
                    {detail?.refList?.length > 0 && <Similars data={detail?.refList} isLoading={isLoading} />}

                    {!similars?.searchResults ? (
                        <TableFilmLoading quantity={9} mt={20} />
                    ) : (
                        <>
                            <div className={styles.titleSimilar}>Các phim cùng thể loại</div>
                            <TableFilm
                                data={similars.searchResults
                                    .filter((similar) => similar.id !== detail.id.toString())
                                    .splice(0, 9)}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Watchs;
