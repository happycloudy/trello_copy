import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IAddDatePayload {
    date: string | null,
    taskId?: number,
    columnId?: number,
}

const addDate = createAsyncThunk(
    'desks/addDate',
    async (payload: IAddDatePayload, thunkApi) => {
        try {
            let res = await client.patch(`/cards/${payload.taskId}`, [{
                op: 'add',
                path: 'timer',
                value: payload.date,
            }])

            if (res.status === 200) {
                return payload
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default addDate