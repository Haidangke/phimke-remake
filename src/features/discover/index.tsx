import { Route, Routes } from 'react-router-dom';

import NotFound from 'components/NotFound';
import MoviePage from './pages/Movie';
import TvShowsPage from './pages/TvShows';

function Discover() {
    return (
        <Routes>
            <Route path='/movie' element={<MoviePage />} />
            <Route path='/tv' element={<TvShowsPage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Discover;
