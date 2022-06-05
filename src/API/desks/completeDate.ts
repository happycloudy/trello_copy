import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IAddDatePayload {
    completed: string,
    taskId?: number
    columnId?: number
}

const completeDate = createAsyncThunk(
    'desks/completeDate',
    async (payload: IAddDatePayload, thunkApi) => {
        try {
            let res = await client.patch(`/cards/${payload.taskId}`, [{
                op: 'add',
                path: 'completed',
                value: payload.completed,
            }])

            if (res.status === 200) {
                return payload
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default completeDate