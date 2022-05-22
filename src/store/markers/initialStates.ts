import {IMarker} from "./markers.slice";
import randomId from "../../utilities/randomId";

export const initialStates = {
    marker: (): IMarker => ({
        text: 'Новый маркер',
        color: '#123123',
        id: randomId()
    })
}