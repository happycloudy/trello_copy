import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";

interface IAddMarkerPayload {
    deskId: number,
    markerId: number,
}

const addMarker = createAsyncThunk(
    'markers/add',
    async ( payload: IAddMarkerPayload, thunkApi) => {
        const text = 'Новый маркер'
        const color = '#123123'
        try {
            let res = await client.patch(`/boards/${payload.deskId}`, [
                {
                    op: 'add',
                    path: `color_stamps/${payload.markerId}`,
                    value: {
                        name: text,
                        value: color
                    },
                },
            ])

            if (res.status === 200) {
                return {
                    id: payload.markerId,
                    text: text,
                    color: color,
                }
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export default addMarker