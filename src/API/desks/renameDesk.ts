import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditWorkspacePayload {
    id?: number,
    value: any,
    path: string,
    op: string,
}


const renameWorkspace = createAsyncThunk(
    'desks/rename',
    async (payload: IEditWorkspacePayload, thunkApi) => {
        const id = payload.id
        delete payload.id
        try {
            let res = await client.patch(`/boards/${id}`, [payload])

            if(res.status === 200) {
                return {name : res.data.BoardName, id: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default renameWorkspace