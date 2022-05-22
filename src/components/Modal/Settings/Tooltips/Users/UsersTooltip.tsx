import React, {useRef, useState} from 'react';
import {usePopper} from "react-popper";
import ListItem from "../ListItem";
import TooltipWrap from "../TooltipWrap";
import TooltipTitle from "../TooltipTitle";
import UserInput from "./UserInput";
import Users from "./Users";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import {useOnClickOutside} from "../../../../../hooks";

interface IUserTooltipProps {
    task: ITask,
    column: IColumn
}

const UsersTooltip = ({column, task}: IUserTooltipProps) => {
    const [active, setActive] = useState<boolean>(false)
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);
    const areaRef = useRef(null)
    const {styles, attributes} = usePopper(
        referenceElement,
        popperElement,
        {modifiers: [{name: 'offset', options: {offset: [0, 10]},}]}
    );

    const toggleActive = () => setActive(!active)
    useOnClickOutside(areaRef, () => setActive(false))

    return (
        <>
            <ListItem ref={setReferenceElement} onClick={toggleActive}>
                Участники
            </ListItem>

            {
                active &&
                <div ref={areaRef}>
                    <TooltipWrap ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <TooltipTitle>
                            Участники
                        </TooltipTitle>
                        <UserInput/>
                        <Users/>
                    </TooltipWrap>
                </div>
            }
        </>
    );
};

export default UsersTooltip;