import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

const addUserToDesk = createAsyncThunk(
    'desks/create',
    async ({deskId, userId}: {deskId: number, userId: number}, thunkApi) => {
        try {
            let res = await client.post(`/boards/${deskId}/add_user/${userId}`)

            if(res.status === 200) {
                return deskId
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default addUserToDesk