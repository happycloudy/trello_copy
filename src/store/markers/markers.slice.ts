import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialMarkers} from "./initial.markers";
import {IPayloadEditMarker} from "./payload-actions.interface";
import getDeskData from "../../API/desks/getDeskData";
import editMarker from "../../API/markers/editMarker";
import addMarker from "../../API/markers/addMarker";

export interface IMarker {
    text: string,
    color: string,
    id: number,
}

interface IInitialInterface {
    markers: IMarker[]
}

const initialState: IInitialInterface = {
    markers: InitialMarkers
}

const markersSlice = createSlice({
    name: 'markers',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [getDeskData.fulfilled.type]: (state, action) => {
            state.markers = action.payload.ColorStamps.map((item: any) => ({
                id: item.id,
                text: item.name,
                color: item.value
            }))
        },
        [editMarker.fulfilled.type]: (state, action: PayloadAction<IPayloadEditMarker>) => {
            const markerId = action.payload.markerId
            const text = action.payload.text
            const color = action.payload.color

            const currentMarker = state.markers.find(arrayMarker => arrayMarker.id === markerId)
            currentMarker!.text = text
            currentMarker!.color = color
        },
        [addMarker.fulfilled.type]: (state, action) => {
            state.markers.push(action.payload)
        }
    },
})


export default markersSlice.reducer