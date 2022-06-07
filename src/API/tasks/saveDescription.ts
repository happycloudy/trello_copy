import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface ISaveDescription {
    value: string,
    taskId: number,
    columnId: number,
}


const saveDescription = createAsyncThunk(
    'tasks/saveDescription',
    async (payload: ISaveDescription, thunkApi) => {
        try {
            let res = await client.patch(`/cards/${payload.taskId}`, [
                {
                    op: 'add',
                    path: 'description',
                    value: payload.value
                }
            ])

            if(res.status === 200) {
                return {
                    description: payload.value,
                    taskId: payload.taskId,
                    columnId: payload.columnId,
                }
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default saveDescription