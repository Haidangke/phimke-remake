import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models/user';

interface InitialState {
    user: User;
    isLoggedIn?: boolean;
}

const initialState: InitialState = {
    user: {
        displayName: '',
        photoURL: '',
        userId: '',
        email: '',
    },
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        resetUserInfo(state) {
            state.user.displayName = '';
            state.user.photoURL = '';
            state.user.userId = '';
            state.user.email = '';
            state.isLoggedIn = false;
        },
    },
});

export const { setUserInfo, resetUserInfo } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;
export default authReducer;
