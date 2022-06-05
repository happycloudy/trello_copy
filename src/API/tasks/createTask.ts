import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface ICreateTaskPayload {
    description?: string,
    color_stamp?: {
        id: number,
        name: string,
        value: number,
    },
    column_id: number,
    name: string,
    timer?: string,
}


const createTask = createAsyncThunk(
    'task/create',
    async (payload: ICreateTaskPayload, thunkApi) => {
        try {
            let res = await client.post(`/cards`, payload)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default createTask