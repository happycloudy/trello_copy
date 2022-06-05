import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDesk} from "../../interfaces/desk.interface";
import {
    IPayloadMoveTask,
    IPayloadRemoveTask,
    IPayloadRenameColumn,
    IPayloadRenameDesk,
    IPayloadRenameTask, IPayloadSelectDate, IPayloadToggleDate, IPayloadToggleMarker
} from "./payload-actions.interface";
import createColumn from "../../API/columns/createColumn";
import getWorkspaceData from "../../API/workspaces/getWorkspaceData";
import createDesk from "../../API/desks/createDesk";
import createTask from "../../API/tasks/createTask";
import renameDesk from "../../API/desks/renameDesk";
import renameColumn from "../../API/columns/renameColumn";
import renameTask from "../../API/tasks/renameTask";
import getDeskData from "../../API/desks/getDeskData";
import deleteTask from "../../API/tasks/deleteTask";
import deleteColumn from "../../API/columns/deleteColumn";
import deleteDesk from "../../API/desks/deleteDesk";

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
        [getWorkspaceData.fulfilled.type]: (state, action) => {
            state.desks = action.payload.Boards.map((item: any) => ({
                name: item.BoardName,
                columns: item.Columns.map((item: any) => ({
                    deskId: item.BoardsId,
                    tasks: item.Cards.map((card: any) => ({
                        id: card.Id,
                        columnId: card.ColumnId,
                        description: card.Description,
                        date: {
                            date: card.Timer
                        },
                        markers: [],
                        comments: [],
                    })),
                    id: item.Id,
                    title: item.Name
                })),
                id: item.Id,
                users: item.Users,
                workspaceId: item.WorkspaceId
            }))
            state.current = undefined
        },
        [getDeskData.fulfilled.type]: (state, action) => {
            state.current = {
                name: action.payload.BoardName,
                columns: action.payload.Columns.map((item: any) => ({
                    deskId: item.BoardsId,
                    tasks: item.Cards.map((card: any) => ({
                        id: card.Id,
                        columnId: card.ColumnId,
                        description: card.Description,
                        date: {
                            date: card.Timer
                        },
                        markers: [],
                        title: card.Name,
                        comments: [],
                    })),
                    id: item.Id,
                    title: item.Name
                })),
                id: action.payload.Id,
                users: action.payload.Users,
                workspaceId: action.payload.WorkspaceId
            }
        },

        [createColumn.fulfilled.type]: (state, action) => {
            state.current!.columns.push({
                tasks: [],
                title: action.payload.Name,
                id: action.payload.Id,
            })
        },
        [createDesk.fulfilled.type]: (state, action) => {
            state.desks.push({
                name: action.payload.BoardName,
                columns: action.payload.Columns,
                id: action.payload.Id,
                users: action.payload.Users,
                workspaceId: action.payload.WorkspaceId
            })
        },
        [createTask.fulfilled.type]: (state, action) => {
            const column = state.current!.columns.find(column => column.id === action.payload.ColumnId)
            // @ts-ignore
            column!.tasks.push({
                id: action.payload.Id,
                columnId: action.payload.ColumnId,
                description: action.payload.Description,
                date: {
                    date: action.payload.Timer,
                    completed: false,
                },
                title: action.payload.Name,
                markers: [],
                comments: [],
            })
        },

        [renameDesk.fulfilled.type]: (state, action: PayloadAction<IPayloadRenameDesk>) => {
            const desk = state.desks.find(desk => desk.id === action.payload.id)
            desk!.name = action.payload.name
        },
        [renameColumn.fulfilled.type]: (state, action: PayloadAction<IPayloadRenameDesk>) => {
            const column = state.current!.columns.find(column => column.id === action.payload.id)
            column!.title = action.payload.name

        },
        [renameTask.fulfilled.type]: (state, action: PayloadAction<IPayloadRenameTask>) => {
            const column = state.current!.columns.find(column => column.id === action.payload.columnId)
            const task = column!.tasks.find(task => task.id === action.payload.taskId)
            console.log(action.payload.name)
            task!.title = action.payload.name
        },

        [deleteTask.fulfilled.type]: (state,action) => {
            const column = state.current!.columns.find(column => column.id === action.payload.columnId)
            column!.tasks = column!.tasks.filter(task => task.id !== column!.id)
        },
        [deleteColumn.fulfilled.type]: (state,action) => {
            state.current!.columns = state.current!.columns.filter(column => column.id !== action.payload.id)
        },
        [deleteDesk.fulfilled.type]: (state,action) => {
            state.desks = state.desks.filter(desk => desk.id !== action.payload.id)
        },
    },
})


export const {
    removeTask,
    toggleMarker,
    selectDate,
    toggleDate,
    moveTask,
} = desksSlice.actions

export default desksSlice.reducer