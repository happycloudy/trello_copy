import {IColumn, IDesk, ITask} from "../../interfaces/desk.interface";

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