import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IWorkSpace} from "../../interfaces/desk.interface";
import {initialStates} from "./initialStates";

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
        createWorkspace: (state) => {
          state.workspaces.push(initialStates.workspace())
        },
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
    }
})

export const {createWorkspace, renameWorkspace, selectWorkspace} = workspacesSlice.actions

export default workspacesSlice.reducer