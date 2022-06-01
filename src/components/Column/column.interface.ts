import {IColumn, ITask} from "../../interfaces/desk.interface";

export interface IColumnProps {
    column: IColumn,
    dropHandler: (e: any, column: IColumn, task: ITask) => void,
    dragStartHandler: (e: any, column: IColumn, task: ITask) => void,
    dropColumnHandler: (e: any, column: IColumn) => void
}