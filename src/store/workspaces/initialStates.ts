import randomId from "../../utilities/randomId";
import {IWorkSpace} from "../../interfaces/desk.interface";

export const initialStates = {
    workspace: (): IWorkSpace => ({
        name: 'Новое рабочее пространство',
        id: randomId()
    })
}