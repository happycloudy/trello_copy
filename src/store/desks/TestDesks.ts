import {IColumn, IDesk} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";

const TestColumns: IColumn[] = [
    {
        title: "1 Столбец",
        id: randomId(),
        tasks: [
            {
                author: [],
                title: 'Задание 1',
                id: randomId(),
                description: '',
                comments: [],
            },
            {
                author: [],
                title: 'Задание 2',
                id: randomId(),
                description: '',
                comments: [],
            },
            {
                author: [],
                title: 'Задание 3',
                id: randomId(),
                description: '',
                comments: [],
            },
        ]
    },
    {
        title: "2 Столбец",
        id: randomId(),
        tasks: [
            {
                author: [],
                title: 'Задание 4',
                id: randomId(),
                description: '',
                comments: [],
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