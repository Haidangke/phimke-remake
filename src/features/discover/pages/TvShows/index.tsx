import { useQuery } from 'react-query';

import { filtersTvSelector } from 'features/discover/discoverSlice';
import LayoutDiscover from 'features/discover/layouts';
import { useAppSelector } from 'app/hooks';

function TvShows() {
    const filterTv = useAppSelector(filtersTvSelector);

    return <div></div>;
    // return (
    //     <LayoutDiscover filmCollection={data?.results} isLoading={isLoading} pageCount={data?.total_pages} />
    // );
}

export default TvShows;
