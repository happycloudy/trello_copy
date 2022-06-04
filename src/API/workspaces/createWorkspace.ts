import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const createWorkspace = createAsyncThunk(
    'workspaces/create',
    async (name, thunkApi) => {
        try {
            let res = await client.post(`/workspaces`)
            console.log(res.data)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default createWorkspace