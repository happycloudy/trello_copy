import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditWorkspacePayload {
    id: number,
    name: string,
    value: any,
}


const editWorkspace = createAsyncThunk(
    'workspaces/edit',
    async (payload: IEditWorkspacePayload, thunkApi) => {
        try {
            let res = await client.post(`/workspaces/${payload.id}`)
            console.log(res.data)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default editWorkspace