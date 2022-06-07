import {IMarker} from "../store/markers/markers.slice";
import {IUser} from "./user.interface";

export interface IDate {
    date: string,
    completed: boolean
}

export interface IComment {
    author?: string,
    text: string,
    authorId: number,
}

export interface ITask {
    author: string[],
    columnId: number,
    id: number,
    title: string,
    markers: IMarker[],
    description: string,
    comments: IComment[],
    date: IDate
}

export interface IColumn {
    title: string,
    id: number,
    tasks: ITask[],
    deskId?: number,
}

export interface IDesk {
    columns: IColumn[],
    name: string,
    id: number,
    users: IUser[],
    workspaceId: number
}

export interface IWorkSpace {
    name: string,
    id: number,
    desks?: any,
    users?: any,
}