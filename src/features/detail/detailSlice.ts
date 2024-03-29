import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Background } from 'models/common';
import { Detail } from 'models/loklok';

interface InitialState {
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    detail: Detail;
    background: Background;
}

const initialState: InitialState = {
    isLoading: false,
    isFetched: false,
    isError: false,

    background: {} as Background,
    detail: {} as Detail,
};

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        fetchData(state, action: PayloadAction<any>) {
            state.isLoading = true;
            state.isError = false;
            state.isFetched = false;
        },
        fetchDataSuccess(state, action: PayloadAction<Detail>) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = false;
            state.detail = action.payload;
        },
        fetchDataFailed(state) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = true;
        },

        setBackground(state, action: PayloadAction<Background>) {
            state.background = action.payload;
        },
    },
});

export const { fetchData, fetchDataFailed, fetchDataSuccess, setBackground } = detailSlice.actions;
export default detailSlice.reducer;
