import {IColumn, ITask} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";

interface IInitialDeskStates {
    column: () => IColumn,
    task: () => ITask,
}

export const initialStates: IInitialDeskStates = {
    column: () => ({
        tasks: [],
        title: 'Новый столбец',
        id: randomId(),
    }),
    task: () => ({
        title: 'Новая задача',
        author: [],
        id: randomId(),
        markers: [],
        description: '',
        comments: [],
    })
}