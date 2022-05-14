import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TestDesks from "./TestDesks";
import {IDesk} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";

interface IInitialInterface {
    desks: IDesk[],
    current: IDesk | undefined,
}

const initialState: IInitialInterface = {
    desks: TestDesks,
    current: undefined,
}

const desksSlice = createSlice({
    name: 'desks',
    initialState: initialState,
    reducers: {
        selectDesk: (state, action: PayloadAction<IDesk>) => {
            if(state.current && (state.current.id === action.payload.id)) return
            state.current = action.payload
        },
        createDesk: (state) => {
            let createdDesk = {
                name: 'Новая доска',
                tasks: [],
                id: randomId()
            }
            state.desks.push(createdDesk)
        }
    },
    extraReducers: {},
})


export const {selectDesk, createDesk} = desksSlice.actions

export default desksSlice.reducer