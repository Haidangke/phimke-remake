import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AdvancedSearchParams, SearchResults } from 'models/search';

export interface Data {
    filter: AdvancedSearchParams;
    data: SearchResults[];
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    hasMore: boolean;
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
            params: 'MOVIE,TVSPECIAL',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: 'up',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
        hasMore: true,
    },
    tv: {
        filter: {
            size: 50,
            params: 'TV,SETI,MINISERIES,VARIETY,TALK,COMIC,DOCUMENTARY',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: 'up',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
        hasMore: true,
    },
    anime: {
        filter: {
            size: 50,
            params: 'COMIC',
            area: '',
            category: '',
            year: '',
            subtitles: '',
            order: 'up',
        },
        data: [],
        isLoading: false,
        isFetched: false,
        isError: false,
        hasMore: true,
    },
};

const discoverSlice = createSlice({
    name: 'discover',
    initialState,
    reducers: {
        setFilterMovie(state, action: PayloadAction<AdvancedSearchParams>) {
            state.movie.filter = action.payload;
            state.movie.isLoading = true;
        },
        setFilterTv(state, action: PayloadAction<AdvancedSearchParams>) {
            state.tv.filter = action.payload;
            state.tv.isLoading = true;
        },
        setFilterAnime(state, action: PayloadAction<AdvancedSearchParams>) {
            state.anime.filter = action.payload;
            state.anime.isLoading = true;
        },
        fetchMovie(state, action: PayloadAction<AdvancedSearchParams>) {
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
        setHasMoreMovie(state) {
            state.movie.hasMore = false;
        },
        fetchMovieFailed(state) {
            state.movie.isLoading = false;
            state.movie.isFetched = true;
            state.movie.isError = true;
        },
        fetchTv(state, action: PayloadAction<AdvancedSearchParams>) {
            state.tv.isFetched = false;
            state.tv.isError = false;
        },
        setTv(state, action: PayloadAction<SearchResults[]>) {
            state.tv.data = action.payload;
            state.tv.isLoading = false;
            state.tv.isFetched = true;
            state.tv.isError = false;
        },
        setHasMoreTv(state) {
            state.tv.hasMore = false;
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
            state.anime.isLoading = false;
            state.anime.isFetched = true;
            state.anime.isError = false;
        },
        setHasMoreAnime(state) {
            state.anime.hasMore = false;
        },
        fetchAnimeFailed(state) {
            state.anime.isLoading = false;
            state.anime.isFetched = true;
            state.anime.isError = true;
        },
        setSizeMovie(state) {
            state.movie.filter.size = state.movie.filter.size + 25;
        },
        setSizeTv(state) {
            state.tv.filter.size = state.tv.filter.size + 25;
        },
        setSizeAnime(state) {
            state.anime.filter.size = state.anime.filter.size + 25;
        }
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
    setHasMoreMovie,
    setHasMoreAnime,
    setHasMoreTv,
    setSizeMovie,
    setSizeTv,
    setSizeAnime
} = discoverSlice.actions;

export default discoverSlice.reducer;
