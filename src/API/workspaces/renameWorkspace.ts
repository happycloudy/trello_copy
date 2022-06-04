import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditWorkspacePayload {
    id?: number,
    value: any,
    path: string,
    op: string,
}


const renameWorkspace = createAsyncThunk(
    'workspaces/rename',
    async (payload: IEditWorkspacePayload, thunkApi) => {
        const id = payload.id
        delete payload.id
        try {
            let res = await client.patch(`/workspaces/${id}`, payload)
            console.log(res.data)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default renameWorkspace