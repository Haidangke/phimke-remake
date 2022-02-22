import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AdvancedSearchParams, SearchResults } from 'models/search';

export interface Data {
    filter: AdvancedSearchParams;
    data: SearchResults[];
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
}

interface InitialState {
    movie: Data;
    tv: Data;
    anime: Data;
}

const initialState: InitialState = {
    movie: {
        filter: {
            size: 50,
            params: '',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: '',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
    },
    tv: {
        filter: {
            size: 50,
            params: '',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: '',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
    },
    anime: {
        filter: {
            size: 50,
            params: '',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: '',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
    },
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        setFilterMovie(state, action: PayloadAction<AdvancedSearchParams>) {
            state.movie.filter = action.payload;
        },
        setFilterTv(state, action: PayloadAction<AdvancedSearchParams>) {
            state.tv.filter = action.payload;
        },
        setFilterAnime(state, action: PayloadAction<AdvancedSearchParams>) {
            state.anime.filter = action.payload;
        },
        fetchMovie(state, action: PayloadAction<AdvancedSearchParams>) {
            state.movie.isLoading = true;
            state.movie.isFetched = false;
            state.movie.isError = false;
        },
        fetchMovieSuccess(state, action: PayloadAction<SearchResults[]>) {
            state.movie.data = state.movie.data.concat(action.payload);
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = false;
        },
        setMovie(state, action: PayloadAction<SearchResults[]>) {
            state.movie.data = action.payload;
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = false;
        },
        fetchMovieFailed(state) {
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = true;
        },
        fetchTv(state, action: PayloadAction<AdvancedSearchParams>) {
            state.tv.isLoading = true;
            state.tv.isFetched = false;
            state.tv.isError = false;
        },
        setTv(state, action: PayloadAction<SearchResults[]>) {
            state.tv.data = action.payload;
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = false;
        },
        fetchTvSuccess(state, action: PayloadAction<SearchResults[]>) {
            state.tv.data = state.tv.data.concat(action.payload);
            state.tv.isLoading = false;
            state.tv.isFetched = true;
            state.tv.isError = false;
        },
        fetchTvFailed(state) {
            state.tv.isLoading = false;
            state.tv.isFetched = true;
            state.tv.isError = true;
        },
        fetchAnime(state, action: PayloadAction<AdvancedSearchParams>) {
            state.anime.isLoading = true;
            state.anime.isFetched = false;
            state.anime.isError = false;
        },
        fetchAnimeSuccess(state, action: PayloadAction<SearchResults[]>) {
            state.anime.data = state.anime.data.concat(action.payload);
            state.anime.isLoading = false;
            state.anime.isFetched = true;
            state.anime.isError = false;
        },
        setAnime(state, action: PayloadAction<SearchResults[]>) {
            state.anime.data = action.payload;
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = false;
        },
        fetchAnimeFailed(state) {
            state.anime.isLoading = false;
            state.anime.isFetched = true;
            state.anime.isError = true;
        },
    },
});

export const discoverMovieSelector = (state: RootState) => state.discover.movie;
export const discoverTvSelector = (state: RootState) => state.discover.tv;
export const discoverAnimeSelector = (state: RootState) => state.discover.anime;

export const {
    setFilterMovie,
    setFilterTv,
    setFilterAnime,
    fetchMovie,
    fetchMovieSuccess,
    fetchMovieFailed,
    fetchTv,
    fetchTvSuccess,
    fetchTvFailed,
    fetchAnime,
    fetchAnimeSuccess,
    fetchAnimeFailed,
    setMovie,
    setTv,
    setAnime,
} = discoverSlice.actions;

export default discoverSlice.reducer;
