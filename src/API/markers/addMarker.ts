import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";


const addMarker = createAsyncThunk(
    'markers/add',
    async (  deskId: number, thunkApi) => {
        const text = 'Новый маркер'
        const color = '#123123'
        try {
            let res = await client.patch(`/boards/${deskId}`, [
                // {
                //     op: 'add',
                //     path: `color_stamps/${payload.markerId}/name`,
                //     value: text,
                // },
                // {
                //     op: 'add',
                //     path: `color_stamps/${payload.markerId}/name`,
                //     value: text,
                // },
            ])

            if (res.status === 200) {
                return
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default addMarker