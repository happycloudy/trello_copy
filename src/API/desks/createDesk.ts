import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface ICreateDesk {
    owner_Id: number,
    workspace_id: number,
    board_name: string,
}


const createDesk = createAsyncThunk(
    'desks/create',
    async (payload: ICreateDesk, thunkApi) => {
        try {
            let res = await client.post(`/boards`, payload)

            if(res.status === 200) {
                return res.data
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default createDesk