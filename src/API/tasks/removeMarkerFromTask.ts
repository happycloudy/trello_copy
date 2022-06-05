import {createAsyncThunk} from "@reduxjs/toolkit";
import client from "../client";
import {IMarker} from "../../store/markers/markers.slice";

interface IAddMarkerPayload {
    taskId: number,
    marker: IMarker,
    columnId: number,
}

const removeMarkerFromTask = createAsyncThunk(
    'tasks/removeMarker',
    async (payload: IAddMarkerPayload, thunkApi) => {
        try {
            let res = await client.patch(`/cards/${payload.taskId}`, [
                {
                    op: 'add',
                    path: `color_stamps_relaion_card/-`,
                    value: {
                        id: payload.marker.id
                    },
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

export default removeMarkerFromTask