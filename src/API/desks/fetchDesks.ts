import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const fetchDesks = createAsyncThunk(
    'workspaces/fetch',
    async (_: any, thunkApi) => {
        try {
            let res = await client.get(`/workspaces`)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default fetchDesks