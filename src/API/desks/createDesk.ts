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
            let createRes = await client.post(`/boards`, payload)

            if(createRes.status === 200) {
                let res = await client.get(`/boards/${createRes.data.Id}`)
                if(res.status === 200) {
                    return res.data
                }
            }

        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default createDesk