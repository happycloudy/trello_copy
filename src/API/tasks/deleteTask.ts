import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const deleteTask = createAsyncThunk(
    'task/delete',
    async (payload: any, thunkApi) => {
        try {
            let res = await client.delete(`/cards/${payload.taskId}`)

            if (res.status === 200 && res.data === 'success') {
                return ({taskId: payload.taskId, columnId: payload.columnId})
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default deleteTask