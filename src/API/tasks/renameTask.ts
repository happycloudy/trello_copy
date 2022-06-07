import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditColumnPayload {
    id?: number,
    value: any,
    path: string,
    op: string,
}


const renameTask = createAsyncThunk(
    'tasks/rename',
    async (payload: IEditColumnPayload, thunkApi) => {
        const id = payload.id
        delete payload.id
        try {
            let res = await client.patch(`/cards/${id}`, [payload])

            if(res.status === 200) {
                return {name : res.data.Name, columnId: res.data.ColumnId, taskId: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default renameTask