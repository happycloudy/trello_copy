import {IColumn, IDesk, ITask} from "../../interfaces/desk.interface";
import {IMarker} from "../markers/markers.slice";

export interface IPayloadRenameDesk {
    desk: IDesk,
    name: string,
}

export interface IPayloadRenameColumn {
    column: IColumn,
    title: string,
}

export interface IPayloadRenameTask {
    column: IColumn,
    task: ITask
    title: string
}

export interface IPayloadRemoveTask {
    task: ITask,
    column: IColumn,
}

export interface IPayloadToggleMarker {
    task: ITask,
    column: IColumn,
    marker: IMarker,
}

export interface IPayloadSelectDate {
    task: ITask,
    column: IColumn,
    date: string,
}

export interface IPayloadToggleDate {
    task: ITask,
    column: IColumn,
    state: boolean,
}

export interface IPayloadMoveTask {
    task: ITask,
    from: IColumn,
    to: IColumn,
    id?: number,
}

