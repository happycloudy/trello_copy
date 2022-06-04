import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {ILogin} from "../../components/Auth/login.interface";

const fetchLogin = createAsyncThunk(
    'user/login',
    async (form: ILogin, thunkApi) => {
        try {
            const loginRes = await client.post(`/token`, form)
            const token = loginRes.data.access_token
            localStorage.setItem('access_token', token)


            const infoRes = await client.get(`/sign_in`)
            return {...infoRes.data, token: token}
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.response.data.errorText)
        }
    }
)

export default fetchLogin