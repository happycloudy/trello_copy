import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {IUser} from "../../interfaces/user.interface";

const fetchInfo = createAsyncThunk(
    'user/info',
    async (token: string, thunkApi): Promise<IUser | undefined | string> => {
        try {
            if(token) {
                const infoRes = await client.get(`/sign_in`)
                return {...infoRes.data, token: token}
            } else {
                return undefined
            }
        } catch (e: any) {
            // @ts-ignore
            return thunkApi.rejectWithValue(e.response.data.errorText)
        }
    }
)

export default fetchInfo