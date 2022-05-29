import {Ref} from "react";

export interface ISelectDeskProps {
    children: any,
    active: boolean,
    refer: Ref<any>
}

export interface ISelectDeskWrapProps {
    active: boolean
}

export interface IDeskItemProps {
    hoverDarkness?: number,
    topDivider?: string,
}