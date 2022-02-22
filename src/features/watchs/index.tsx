import { useAppSelector } from 'app/hooks';

import Comment from 'features/comment';
import Similars from './components/Similars';
import styles from './Watchs.module.scss';
import Media from './components/Media';
import { useQuery } from 'react-query';
import searchApi from 'apis/searchApi';
import TableFilm from 'components/TableFilm';

function Watchs() {
    const { detail, isLoading } = useAppSelector((state) => state.detail);
    const similars = useQuery(
        ['similar', detail],
        async () =>
            await searchApi.advancedSearch({
                size: 10,
                params: '',
                area: detail.areaList[0].id.toString(),
                category: detail.tagList[0].id.toString(),
                year: '',
                subtitles: '',
                order: '',
            })
    );
    console.log({ detail });

    return (
        <div className={styles.root}>
            <div className={styles.name}>{detail.name}</div>
            <div className={styles.media}>{<Media />}</div>
            <div className={styles.main}>
                <div className={styles.left}>{detail.id && <Comment filmId={detail.id} />}</div>
                <div className={styles.right}>
                    {detail?.refList?.length > 0 && <Similars data={detail?.refList} isLoading={isLoading} />}
                    <div>
                        {similars?.data?.searchResults && (
                            <TableFilm
                                data={similars.data.searchResults
                                    .filter((similar) => similar.id !== detail.id.toString())
                                    .splice(0, 6)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watchs;
