import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/user.interface";
import client from "../client";

const getUsers = createAsyncThunk(
    'user/getAll',
    async (_, thunkApi): Promise<IUser | undefined | string> => {
        try {
            const usersRes = await client.get(`/users`)
            if(usersRes.status === 200) {
                return usersRes.data
            }
        } catch (e: any) {
            // @ts-ignore
            return thunkApi.rejectWithValue(e.response.data.errorText)
        }
    }
)

export default getUsers