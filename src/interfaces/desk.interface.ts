export interface ITask {
    author: string,
    id: number,
    title: string,
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