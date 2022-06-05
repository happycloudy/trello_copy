import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const deleteColumns = createAsyncThunk(
    'column/delete',
    async (id: number, thunkApi) => {
        try {
            let res = await client.delete(`/columns/${id}`)

            if (res.status === 200 && res.data === 'success') {
                return {id: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default deleteColumns