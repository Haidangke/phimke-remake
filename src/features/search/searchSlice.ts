import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchWithKeyword } from 'models/search';

interface InitialState {
    isSearch: boolean;
    query: string;
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    listWithKeyword: SearchWithKeyword;
}

const initialState: InitialState = {
    isSearch: false,
    query: '',
    isLoading: false,
    isFetched: false,
    isError: false,
    listWithKeyword: {} as SearchWithKeyword,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setIsSearch(state, action: PayloadAction<boolean>) {
            state.isSearch = action.payload;
        },
        fetchSearch(state, action: PayloadAction<string>) {
            state.isLoading = true;
            state.query = action.payload;
            state.isFetched = false;
            state.isError = false;
        },
        fetchListSearch(state, action: PayloadAction<string>) {
            state.isLoading = true;
            state.query = action.payload;
            state.isFetched = false;
        },
        fetchSearchSuccess(state, action: PayloadAction<SearchWithKeyword>) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = false;
            state.listWithKeyword = action.payload;
        },
        fetchSearchFailed(state) {
            state.isLoading = false;
            state.isFetched = true;
            state.isError = true;
        },
    },
});

export const { setIsSearch, fetchSearch, fetchListSearch, fetchSearchSuccess } = searchSlice.actions;
export default searchSlice.reducer;
