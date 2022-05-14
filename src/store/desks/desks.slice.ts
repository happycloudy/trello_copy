import {createSlice} from "@reduxjs/toolkit";

interface IInitialInterface {
    desks: any[]
}

const initialState: IInitialInterface = {
    desks: [],
}

const desksSlice = createSlice({
    name: 'desks',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {

    },
})


export default  desksSlice.reducer