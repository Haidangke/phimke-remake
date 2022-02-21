import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MediaParams } from 'models/loklok';

interface InitialState {
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    media: Media;
}

const initialState: InitialState = {
    isLoading: true,
    isFetched: false,
    isError: false,
    media: {} as Media,
};

const watchsSlice = createSlice({
    name: 'watchs',
    initialState,
    reducers: {
        fetchData(state, action: PayloadAction<MediaParams>) {
            state.isLoading = true;
            state.isError = false;
            state.isFetched = false;
        },
        fetchDataSuccess(state, action: PayloadAction<Media>) {
            state.isLoading = false;
            state.isError = false;
            state.isFetched = true;
            state.media = action.payload;
        },
        fetchDataFailed(state) {
            state.isLoading = false;
            state.isError = true;
            state.isFetched = true;
        },
    },
});

export const { fetchData, fetchDataSuccess, fetchDataFailed } = watchsSlice.actions;
export default watchsSlice.reducer;
