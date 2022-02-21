import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    filtersMovieSelector,
    filtersTvSelector,
    setFilterMovie,
    setFilterTv,
} from 'features/discover/discoverSlice';
import Pagination from 'components/Pagination';

interface PaginateProps {
    pageCount?: number;
    media: string;
}

function Paginate({ pageCount, media }: PaginateProps) {
    const dispatch = useAppDispatch();
    const movieFilter = useAppSelector(filtersMovieSelector);
    const tvFilter = useAppSelector(filtersTvSelector);
    const currentPage = media === 'movie' ? movieFilter.page : tvFilter.page;

    const onPageChange = (e: any) => {
        const selected = e.selected + 1;
        dispatch(
            media === 'movie'
                ? setFilterMovie({ ...movieFilter, page: selected })
                : setFilterTv({ ...tvFilter, page: selected })
        );
        window.scrollTo(0, 0);
    };

    if (!pageCount) {
        return <div></div>;
    }

    return (
        <Pagination>
            <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                forcePage={(currentPage as number) - 1}
            />
        </Pagination>
    );
}

export default Paginate;
