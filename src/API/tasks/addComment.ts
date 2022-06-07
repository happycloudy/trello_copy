import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface ISaveDescription {
    value: string,
    taskId: number,
    columnId: number,
}


const addComment = createAsyncThunk(
    'tasks/addComment',
    async (payload: ISaveDescription, thunkApi) => {
        try {
            let res = await client.patch(`/cards/${payload.taskId}`, [
                {
                    op: 'add',
                    path: 'comment/-',
                    value: {
                        comment: payload.value
                    }
                }
            ])

            if(res.status === 200) {
                return {
                    comment: res.data.Comment.find((item: any) => item.Comment === payload.value),
                    taskId: payload.taskId,
                    columnId: payload.columnId,
                }
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default addComment