import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {ILogin} from "../../components/Auth/login.interface";

const fetchLogin = createAsyncThunk(
    'user/login',
    async (form: ILogin, thunkApi) => {
        try {
            const loginRes = await client.post(`/token?username=${form.username}&password=${form.password}`)
            const token = loginRes.data
            console.log(token)
            localStorage.setItem('access_token', token)


            const infoRes = await client.post(`/sign_in`)
            return infoRes.data
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default fetchLogin