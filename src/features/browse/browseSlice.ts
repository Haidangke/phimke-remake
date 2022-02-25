import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { RecommendItem } from 'models/loklok';

interface InitialState {
    data: RecommendItem[];
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    index: number;
    hasMore: boolean;
}

const initialState: InitialState = {
    data: [],
    isLoading: false,
    isFetched: false,
    isError: false,
    index: 1,
    hasMore: true,
};

const browseSlice = createSlice({
    name: 'browse',
    initialState,
    reducers: {
        fetchData(state, action) {
            state.isLoading = true;
            state.isFetched = false;
            state.isError = false;
        },
        fetchDataSuccess(state, action: PayloadAction<RecommendItem[]>) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = false;

            state.data = state.data.concat(action.payload);
        },
        fetchDataFailed(state) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = true;
        },

        setIndex(state) {
            state.index = state.index + 1;
        },
        setHasMore(state) {
            state.hasMore = false;
        },
    },
});

export const browseSelector = (state: RootState) => state.browse.data;
export const indexSelector = (state: RootState) => state.browse.index;
export const hasMoreSelector = (state: RootState) => state.browse.hasMore;

export const { fetchData, fetchDataSuccess, fetchDataFailed, setIndex, setHasMore } = browseSlice.actions;
export default browseSlice.reducer;
