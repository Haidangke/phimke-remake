import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface InitialState {
    language: 'vi' | 'en';
}

const languageStorage = localStorage.getItem('language');

const language =
    languageStorage !== 'vi' && languageStorage !== 'en' ? 'vi' : (languageStorage as 'en' | 'vi');

const initialState: InitialState = {
    language,
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {},
});

export const languageSelector = (state: RootState) => state.setting.language;

export default settingSlice.reducer;
