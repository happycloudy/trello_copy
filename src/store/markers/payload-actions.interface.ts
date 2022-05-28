import {IMarker} from "./markers.slice";

export interface IPayloadEditMarker {
    marker: IMarker,
    text: string,
    color: string,
}