import {IDesk} from "../../interfaces/desk.interface";
import randomId from "../../utilities/randomId";

const TestDesks: IDesk[] = [
    {
        name: 'Доска 1',
        tasks: [],
        id: randomId()
    },
    {
        name: 'Доска 2',
        tasks: [],
        id: randomId()
    },
    {
        name: 'Доска 3',
        tasks: [],
        id: randomId()
    },
    {
        name: 'Очень длинное название доски',
        tasks: [],
        id: randomId()
    },
]

export default TestDesks