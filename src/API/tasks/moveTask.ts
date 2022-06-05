import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {IColumn, ITask} from "../../interfaces/desk.interface";

interface IMoveTaskPayload {
    payload: {
        id?: number,
        value: any,
        path: string,
        op: string,
    }
    data: {
        task: ITask,
        from: IColumn,
        to: IColumn,
        id?: number,
    }
}


const moveTask = createAsyncThunk(
    'tasks/move',
    async (payload: IMoveTaskPayload, thunkApi) => {
        const id = payload.payload.id
        delete payload.payload.id
        try {
            let res = await client.patch(`/cards/${id}`, [payload.payload])

            if(res.status === 200) {
                return payload.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default moveTask