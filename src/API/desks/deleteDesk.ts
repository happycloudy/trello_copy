import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const deleteDesk = createAsyncThunk(
    'desk/delete',
    async (id: number, thunkApi) => {
        try {
            let res = await client.delete(`/boards/${id}`)

            if (res.status === 200 && res.data === 'success') {
                return {id: id}
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default deleteDesk