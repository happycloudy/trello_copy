import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/user.interface";
import fetchLogin from "../../API/user/fetchLogin";
import fetchInfo from "../../API/user/fetchInfo";
import getUsers from "../../API/user/getUsers";

interface IInitialState {
    user: IUser,
    users: any[],
    error: string,
    loading: boolean,
}

const InitialState: IInitialState = {
    user: {
        auth: false,
        displayName: '',
        id: 0,
        emailAddress: '',
        globalRole: '',
        login: '',
    },
    users: [],
    error: '',
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: InitialState,
    reducers: {},
    extraReducers: {
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.user = {
                ...state.user,
                id: action.payload.Id,
                globalRole: action.payload.GlobalRole,
                displayName: action.payload.DisplayName,
            }
            state.user.auth = true
        },
        [fetchLogin.pending.type]: (state) => {
            state.loading = true
        },
        [fetchLogin.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        [fetchInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.user = {
                ...state.user,
                id: action.payload.Id,
                globalRole: action.payload.GlobalRole,
                displayName: action.payload.DisplayName,
            }
            state.user.auth = true
        },
        [fetchInfo.pending.type]: (state) => {
            state.loading = true
        },
        [fetchInfo.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        [getUsers.fulfilled.type]: (state, action) => {
            state.users = action.payload.map((user: any) => ({
                id: user.Id,
                login: user.Login,
                displayName: user.DisplayName,
                globalRole: user.GlobalRole,
            }))
        },
    }
})

export default userSlice.reducer