import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginError, RegisterResponse, SignIn, SignUp, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {unsetUser} from "./usersSlice";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: ValidationError }>(
    'users/getAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axiosApi.get<User[]>('users');
            return data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const signUp = createAsyncThunk<User, SignUp, { rejectValue: ValidationError }>(
    'users/sign-up',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await axiosApi.post<User>('auth/sign-up', body);
            return data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const signIn = createAsyncThunk<User, SignIn, { rejectValue: LoginError }>(
    'users/sign-in',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await axiosApi.post<User>('auth/sign-in', body);
            return data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 401) {
                return rejectWithValue(e.response.data as LoginError);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk<void, void, { state: RootState }>('users/logout', async (_, {dispatch}) => {
    await axiosApi.delete('/auth/sessions');
    dispatch(unsetUser());
});

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/auth/google', {credential});
            console.log(response.data.user);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    },
);

export const deleteUser = createAsyncThunk <{ message: string }, number, { rejectValue: GlobalError }>
(
    'users/deleteUser',
        async (id, {rejectWithValue}) => {
            try {
                const {data} = await axiosApi.delete<{ message: string }>(`/users/${id}`);
                return data;
            } catch (e) {
                if (isAxiosError(e) && e.response && e.response.data) {
                    return rejectWithValue(e.response.data as GlobalError);
                }
                throw e;
            }
        }
);