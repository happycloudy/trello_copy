export interface ITask {
    author: string,
    id: number,
}

export interface IDesk {
    tasks: ITask[],
    name: string,
    id: number,
}