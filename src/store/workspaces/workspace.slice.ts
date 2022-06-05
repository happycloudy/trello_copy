import {createSlice} from "@reduxjs/toolkit";
import { IWorkSpace} from "../../interfaces/desk.interface";
import fetchWorkspaces from "../../API/workspaces/fetchWorkspaces";
import createWorkspace from "../../API/workspaces/createWorkspace";
import getWorkspaceData from "../../API/workspaces/getWorkspaceData";
import renameWorkspace from "../../API/workspaces/renameWorkspace";
import deleteWorkspace from "../../API/workspaces/deleteWorkspace";

export interface IPayloadRenameWorkspace {
    desk: IWorkSpace,
    name: string,
}

interface IInitialState {
    workspaces: IWorkSpace[],
    current: IWorkSpace | undefined,
    error: string,
    loading: boolean,
}

const InitialState: IInitialState = {
    workspaces: [],
    current: undefined,
    error: '',
    loading: false,
}

const workspacesSlice = createSlice({
    name: 'workspaces',
    initialState: InitialState,
    reducers: {
    },
    extraReducers: {
        [fetchWorkspaces.fulfilled.type]: (state,action) => {
            state.loading = false
            state.workspaces = action.payload.map((item:any) => ({
                id: item.Id,
                name: item.Name,
            }))
        },
        [fetchWorkspaces.pending.type]: (state) => {
            state.loading = true
        },
        [fetchWorkspaces.rejected.type]: (state,action) => {
            state.loading = false
            state.error = action.payload
        },


        [createWorkspace.fulfilled.type]: (state,action) => {
            state.loading = false
            state.workspaces.push({
                id: action.payload.Id,
                name: action.payload.Name,
            })
        },
        [createWorkspace.pending.type]: (state) => {
            state.loading = true
        },
        [createWorkspace.rejected.type]: (state,action) => {
            state.loading = false
            state.error = action.payload
        },


        [getWorkspaceData.fulfilled.type]: (state,action) => {
            state.current = {
                id: action.payload.Id,
                name: action.payload.Name,
                desks: action.payload.Boards,
                users: action.payload.User
            }
        },

        [renameWorkspace.fulfilled.type]: (state,action) => {
            const workspace = state.workspaces.find(workspace => workspace.id === action.payload.id)
            workspace!.name = action.payload.name
        },

        [deleteWorkspace.fulfilled.type]: (state,action) => {
            state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload.id)
        },
    }
})


export default workspacesSlice.reducer