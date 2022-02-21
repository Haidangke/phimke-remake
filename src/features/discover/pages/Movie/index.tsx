import { useQuery } from 'react-query';
import { useAppSelector } from 'app/hooks';
import { filtersMovieSelector } from 'features/discover/discoverSlice';
import LayoutDiscover from 'features/discover/layouts';

function Movie() {
    const filterMovie = useAppSelector(filtersMovieSelector);

    return (
        // <LayoutDiscover filmCollection={data?.results} isLoading={isLoading} pageCount={data?.total_pages} />
        <div></div>
    );
}

export default Movie;
