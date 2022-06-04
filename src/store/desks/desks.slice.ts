import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IColumn, IDesk} from "../../interfaces/desk.interface";
import {
    IPayloadMoveTask,
    IPayloadRemoveTask,
    IPayloadRenameColumn,
    IPayloadRenameDesk,
    IPayloadRenameTask, IPayloadSelectDate, IPayloadToggleDate, IPayloadToggleMarker
} from "./payload-actions.interface";
import {initialStates} from "./initialStates";
import {IUser} from "../../interfaces/user.interface";
import createColumn from "../../API/columns/createColumn";

interface IInitialInterface {
    desks: IDesk[],
    current: IDesk | undefined,
}

const initialState: IInitialInterface = {
    desks: [],
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
        selectDate: (state, action: PayloadAction<IPayloadSelectDate>) => {
            const column = action.payload.column
            const task = action.payload.task
            const date = action.payload.date
            const currentColumn = state.current!.columns.find(columnArrItem => columnArrItem.id === column.id)
            const currentTask = currentColumn!.tasks.find(taskArrItem => taskArrItem.id === task.id)
            currentTask!.date.date = date
        },

        loadDesks: (state, action) => {
            console.log(action.payload)
            state.desks = action.payload.map((item: any) => ({
                columns: item.Columns,
                name: item.BoardName,
                id: item.Id,
                users: item.Users,
                workspaceId: item.WorkspaceId
            }))
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
        },
        toggleDate: (state, action: PayloadAction<IPayloadToggleDate>) => {
            const column = action.payload.column
            const task = action.payload.task
            const checked = action.payload.state
            const currentColumn = state.current!.columns.find(columnArrItem => columnArrItem.id === column.id)
            const currentTask = currentColumn!.tasks.find(taskArrItem => taskArrItem.id === task.id)
            currentTask!.date.completed = checked
        },

        moveTask: (state, action: PayloadAction<IPayloadMoveTask>) => {
            const from = state.current!.columns.find(column => column.id === action.payload.from.id)
            const to = state.current!.columns.find(column => column.id === action.payload.to.id)

            if (action.payload.id) {
                const index = to!.tasks.findIndex(task => task.id === action.payload.id)

                from!.tasks = from!.tasks.filter(task => task.id !== action.payload.task.id)
                to!.tasks.splice(index, 0, action.payload.task)
            } else if (!to!.tasks.length) {
                from!.tasks = from!.tasks.filter(task => task.id !== action.payload.task.id)
                to!.tasks.push(action.payload.task)
            }
        },
    },
    extraReducers: {
        [createColumn.fulfilled.type]: (state, action) => {
            state.current!.columns.push(initialStates.column())
        }
    },
})


export const {
    selectDesk,
    renameColumn,
    renameTask,
    addTask,
    removeTask,
    renameDesk,
    toggleMarker,
    selectDate,
    toggleDate,
    moveTask,
    loadDesks
} = desksSlice.actions

export default desksSlice.reducer