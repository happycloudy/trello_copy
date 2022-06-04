import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/user.interface";
import fetchLogin from "../../API/user/fetchLogin";
import fetchInfo from "../../API/user/fetchInfo";

interface IInitialState {
    user: IUser,
    error: string,
    loading: boolean,
}

const InitialState: IInitialState = {
    user: {
        auth: false,
        display_name: '',
        user_id: 0,
        email_address: '',
        global_role: '',
        login: '',
    },
    error: '',
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: InitialState,
    reducers: {
    },
    extraReducers: {
        [fetchLogin.fulfilled.type]: (state,action: PayloadAction<IUser>) => {
            state.loading = false
            state.user = {...state.user, ...action.payload}
            state.user.auth = true
        },
        [fetchLogin.pending.type]: (state) => {
            state.loading = true
        },
        [fetchLogin.rejected.type]: (state,action) => {
            state.loading = false
            state.error = action.payload
        },


        [fetchInfo.fulfilled.type]: (state,action: PayloadAction<IUser>) => {
            state.loading = false
            state.user = {...state.user, ...action.payload}
            state.user.auth = true
        },
        [fetchInfo.pending.type]: (state) => {
            state.loading = true
        },
        [fetchInfo.rejected.type]: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export default userSlice.reducer