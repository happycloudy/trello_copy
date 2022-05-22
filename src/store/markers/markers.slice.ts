import {createSlice} from "@reduxjs/toolkit";
import {InitialMarkers} from "./initial.markers";
import {initialStates} from "./initialStates";

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
        editMarker: (state,action) => {

        }
    },
    extraReducers: {},
})


export const {addMarker} = markersSlice.actions

export default markersSlice.reducer