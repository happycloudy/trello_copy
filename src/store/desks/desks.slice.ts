import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TestDesks from "./TestDesks";
import {IDesk} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";
import {
    IPayloadRemoveTask,
    IPayloadRenameColumn,
    IPayloadRenameDesk,
    IPayloadRenameTask, IPayloadToggleMarker
} from "./payload-actions.interface";
import {initialStates} from "./initialStates";

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
            if (state.current && (state.current.id === action.payload.id)) return
            state.current = action.payload
        },
        createDesk: (state) => {
            let createdDesk: IDesk = {
                name: 'Новая доска',
                columns: [],
                id: randomId()
            }
            state.desks.push(createdDesk)
        },
        renameDesk: (state, action: PayloadAction<IPayloadRenameDesk>) => {
            let deskIndex = 0
            state.desks.forEach((desk, index) => {
                if (desk.id === action.payload.desk.id) {
                    deskIndex = index
                }
            })

            state.desks[deskIndex].name = action.payload.name
        },
        renameColumn: (state, action: PayloadAction<IPayloadRenameColumn>) => {
            let columnIndex = 0
            state.current!.columns.forEach((column, index) => {
                if (column.id === action.payload.column.id) {
                    columnIndex = index
                }
            })

            state.current!.columns[columnIndex].title = action.payload.title
        },
        renameTask: (state, action: PayloadAction<IPayloadRenameTask>) => {
            let columnIndex = 0
            state.current!.columns.forEach((column, index) => {
                if (column.id === action.payload.column.id) {
                    columnIndex = index
                }
            })

            let taskIndex = 0
            state.current!.columns[columnIndex].tasks.forEach((task, index) => {
                if (task.id === action.payload.task.id) {
                    taskIndex = index
                }
            })
            state.current!.columns[columnIndex].tasks[taskIndex].title = action.payload.title
        },
        addColumn: (state) => {
            state.current!.columns.push(initialStates.column())
        },
        addTask: (state, action) => {
            let columnIndex = 0
            state.current!.columns.forEach((column, index) => {
                if (column.id === action.payload.column.id) {
                    columnIndex = index
                }
            })

            state.current!.columns[columnIndex].tasks.push(initialStates.task())
        },
        removeTask: (state, action: PayloadAction<IPayloadRemoveTask>) => {
            let columnIndex = 0
            state.current!.columns.forEach((column, index) => {
                if (column.id === action.payload.column.id) {
                    columnIndex = index
                }
            })

            state.current!.columns[columnIndex].tasks = state.current!.columns[columnIndex].tasks.filter(task => task.id !== action.payload.task.id)
        },
        toggleMarker: (state, action: PayloadAction<IPayloadToggleMarker>) => {
            let columnIndex = 0
            state.current!.columns.forEach((column, index) => {
                if (column.id === action.payload.column.id) {
                    columnIndex = index
                }
            })

            let taskIndex = 0
            state.current!.columns[columnIndex].tasks.forEach((task, index) => {
                if (task.id === action.payload.task.id) {
                    taskIndex = index
                }
            })

            const marker = state.current!.columns[columnIndex].tasks[taskIndex].markers.find(marker => marker.id === action.payload.marker.id)
            if (marker) {
                state.current!.columns[columnIndex].tasks[taskIndex].markers =
                    state.current!.columns[columnIndex].tasks[taskIndex].markers.filter(marker =>
                        marker.id !== action.payload.marker.id
                    )
            } else {
                state.current!.columns[columnIndex].tasks[taskIndex].markers.push(action.payload.marker)
            }
        }
    },
    extraReducers: {},
})


export const {
    selectDesk,
    createDesk,
    renameColumn,
    renameTask,
    addColumn,
    addTask,
    removeTask,
    renameDesk,
    toggleMarker
} = desksSlice.actions

export default desksSlice.reducer