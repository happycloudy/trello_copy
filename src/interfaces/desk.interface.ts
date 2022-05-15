export interface IComment {
    author?: string,
    text: string,
}

export interface ITask {
    author: string[],
    id: number,
    title: string,
    description: string,
    comments: IComment[]
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