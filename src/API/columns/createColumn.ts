import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface ICreateColumnPayload {
    name: string,
    boards_id: number
}

const createColumn = createAsyncThunk(
    'columns/create',
    async (payload: ICreateColumnPayload, thunkApi) => {
        try {
            const columnRes = await client.post(`/columns`, payload)
            if(columnRes.status === 200) {
                return columnRes.data
            }
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.response.data.errorText)
        }
    }
)

export default createColumn