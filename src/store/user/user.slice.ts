import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/user.interface";

interface IInitialState {
    user: IUser,
    error: string,
    loading: boolean,
}

const InitialState: IInitialState = {
    user: {
        access_token: '',
        auth: false,
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

    }
})

export default userSlice.reducer