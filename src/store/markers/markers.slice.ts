import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialMarkers} from "./initial.markers";
import {initialStates} from "./initialStates";
import {IPayloadEditMarker} from "./payload-actions.interface";

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
        addMarker: (state) => {
            state.markers.push(initialStates.marker())
        },
        editMarker: (state,action: PayloadAction<IPayloadEditMarker>) => {
            const marker = action.payload.marker
            const text = action.payload.text
            const color = action.payload.color

            const currentMarker = state.markers.find(arrayMarker => arrayMarker.id === marker.id)
            currentMarker!.text = text
            currentMarker!.color = color
        }
    },
    extraReducers: {},
})


export const {addMarker, editMarker} = markersSlice.actions

export default markersSlice.reducer