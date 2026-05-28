import {LoginError, User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteUser, getAllUsers, signIn, signUp} from "./usersThunks";
import {RootState} from "../../app/store";

export interface UserState {
    user: User | null;
    users: User[];
    usersLoading: boolean;
    deleteLoading: boolean;
    signUpLoading: boolean;
    signInLoading: boolean;
    signUpError: ValidationError | null;
    signInError: LoginError | null;
}

const initialState: UserState = {
    user: null,
    users: [],
    usersLoading: false,
    deleteLoading: false,
    signUpLoading: false,
    signInLoading: false,
    signUpError: null,
    signInError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.signUpLoading = true;
            })
            .addCase(signUp.fulfilled, (state, {payload: user}) => {
                state.signUpLoading = false;
                state.user = user;
            })
            .addCase(signUp.rejected, (state, {payload: error}) => {
                state.signUpLoading = false;
                state.signUpError = error || null;
            });

        builder
            .addCase(signIn.pending, (state) => {
                state.signInLoading = true;
                state.signInError = null;
            })
            .addCase(signIn.fulfilled, (state, {payload: user}) => {
                state.signInLoading = false;
                state.user = user;
            })
            .addCase(signIn.rejected, (state, {payload: error}) => {
                state.signInLoading = false;
                state.signInError = error || null;
            });

        builder
            .addCase(getAllUsers.pending, (state) => {
                state.usersLoading = true;
                state.signInError = null;
            })
            .addCase(getAllUsers.fulfilled, (state, {payload: users}) => {
                state.usersLoading = false;
                state.users = users;
            })
            .addCase(getAllUsers.rejected, (state, {payload: error}) => {
                state.usersLoading = false;
            });
        builder
            .addCase(deleteUser.pending, (state) => {
                state.deleteLoading = true;
                state.signInError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.meta.arg);
                state.deleteLoading = false;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.usersLoading = false;
            });
    },
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectSignUpError = (state: RootState) => state.users.signUpError;
export const selectSignUpLoading = (state: RootState) => state.users.signUpLoading;
export const selectSignInLoading = (state: RootState) => state.users.signInLoading;
