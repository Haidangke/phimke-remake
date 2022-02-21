import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { MovieDiscover } from 'models/movie';
import { TvDiscover } from 'models/tv';

interface InitialState {
    filtersMovie: MovieDiscover;
    filtersTv: TvDiscover;
}

const initialState: InitialState = {
    filtersMovie: {
        sort_by: 'popularity.desc',
        with_genres: '',
        page: 1,
        primary_release_year: 0,
    },
    filtersTv: {
        sort_by: 'popularity.desc',
        with_genres: '',
        page: 1,
        first_air_date_year: 0,
    },
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        setFilterMovie(state, action: PayloadAction<MovieDiscover>) {
            state.filtersMovie = action.payload;
        },
        setFilterTv(state, action: PayloadAction<TvDiscover>) {
            state.filtersTv = action.payload;
        },
    },
});

export const filtersMovieSelector = (state: RootState) => state.discover.filtersMovie;
export const filtersTvSelector = (state: RootState) => state.discover.filtersTv;

export const { setFilterMovie, setFilterTv } = discoverSlice.actions;

export default discoverSlice.reducer;
