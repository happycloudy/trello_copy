import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IEditMarkerPayload {
    deskId: number,
    markerId: number,
    text: string,
    color: string,
}


const editMarker = createAsyncThunk(
    'markers/edit',
    async (payload: IEditMarkerPayload, thunkApi) => {
        try {
            let res = await client.patch(`/boards/${payload.deskId}`, [
                {
                    op: 'add',
                    path: `color_stamps/${payload.markerId}/name`,
                    value: payload.text,
                },
                {
                    op: 'add',
                    path: `color_stamps/${payload.markerId}/value`,
                    value: payload.color,
                },
            ])

            if (res.status === 200) {
                return payload
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default editMarker