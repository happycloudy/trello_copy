import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditColumnPayload {
    id?: number,
    value: any,
    path: string,
    op: string,
}


const renameColumn = createAsyncThunk(
    'columns/rename',
    async (payload: IEditColumnPayload, thunkApi) => {
        const id = payload.id
        delete payload.id
        try {
            let res = await client.patch(`/columns/${id}`, [payload])

            if(res.status === 200) {
                return {name : res.data.Name, id: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default renameColumn