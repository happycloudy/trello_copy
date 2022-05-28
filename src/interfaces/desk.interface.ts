import {IMarker} from "../store/markers/markers.slice";

export interface IDate {
    date: string,
    completed: boolean
}

export interface IComment {
    author?: string,
    text: string,
}

export interface ITask {
    author: string[],
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
}

export interface IDesk {
    columns: IColumn[],
    name: string,
    id: number,
}