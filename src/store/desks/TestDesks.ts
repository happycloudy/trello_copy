import {IColumn, IDesk} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";

const TestColumns: IColumn[] = [
    {
        title: "1 Столбец",
        id: randomId(),
        tasks: [
            {
                author: "Автор 1",
                title: 'Задание 1',
                id: randomId()
            },
            {
                author: "Автор 1",
                title: 'Задание 2',
                id: randomId()
            },
            {
                author: "Автор 1",
                title: 'Задание 3',
                id: randomId()
            },
        ]
    },
    {
        title: "2 Столбец",
        id: randomId(),
        tasks: [
            {
                author: "Автор 2",
                title: 'Задание 4',
                id: randomId()
            }
        ]
    },
]


const TestDesks: IDesk[] = [
    {
        name: 'Доска 1',
        columns: TestColumns,
        id: randomId()
    },
    {
        name: 'Доска 2',
        columns: [],
        id: randomId()
    },
    {
        name: 'Доска 3',
        columns: [],
        id: randomId()
    },
    {
        name: 'Очень длинное название доски',
        columns: [],
        id: randomId()
    },
]

export default TestDesks