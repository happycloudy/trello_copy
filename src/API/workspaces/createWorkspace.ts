import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const createWorkspace = createAsyncThunk(
    'workspaces/create',
    async (name: string, thunkApi) => {
        try {
            let res = await client.post(`/workspaces`, {name: name})

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default createWorkspace