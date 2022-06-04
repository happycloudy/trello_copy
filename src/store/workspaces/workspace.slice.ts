import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IWorkSpace} from "../../interfaces/desk.interface";
import fetchWorkspaces from "../../API/workspaces/fetchWorkspaces";
import createWorkspace from "../../API/workspaces/createWorkspace";

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
        renameWorkspace: (state, action: PayloadAction<IPayloadRenameWorkspace>) => {
            let workspaceIndex = 0
            state.workspaces.forEach((workspace, index) => {
                if (workspace.id === action.payload.desk.id) {
                    workspaceIndex = index
                }
            })

            state.workspaces[workspaceIndex].name = action.payload.name
        },
        selectWorkspace: (state, action: PayloadAction<IWorkSpace>) => {
            state.current = action.payload
        }
    },
    extraReducers: {
        [fetchWorkspaces.fulfilled.type]: (state,action) => {
            state.loading = false
            state.workspaces = action.payload.map((item:any) => ({
                id: item.Id,
                name: item.Name,
                desks: item.Boards
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
            state.workspaces = action.payload
        },
        [createWorkspace.pending.type]: (state) => {
            state.loading = true
        },
        [createWorkspace.rejected.type]: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {renameWorkspace, selectWorkspace} = workspacesSlice.actions

export default workspacesSlice.reducer