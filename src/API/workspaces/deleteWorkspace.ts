import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const deleteWorkspace = createAsyncThunk(
    'workspaces/delete',
    async (id: number, thunkApi) => {
        try {
            let res = await client.delete(`/workspaces/${id}`)

            if (res.status === 200 && res.data === 'success') {
                return {id: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default deleteWorkspace