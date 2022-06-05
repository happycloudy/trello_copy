import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const getDeskData = createAsyncThunk(
    'desks/fetchById',
    async (id: number, thunkApi) => {
        try {
            let res = await client.get(`/boards/${id}`)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default getDeskData