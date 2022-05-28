import React, {useRef, useState} from 'react';
import {usePopper} from "react-popper";
import ListItem from "../ListItem";
import TooltipWrap from "../TooltipWrap";
import TooltipTitle from "../TooltipTitle";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import {useOnClickOutside} from "../../../../../hooks";
import MarkerInput from "./MarkerInput";
import Markers from "./Markers";

interface IMarkerTooltipProps {
    task: ITask,
    column: IColumn
}


const MarkerTooltip = ({column, task}: IMarkerTooltipProps) => {
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
                Метки
            </ListItem>

            {
                active &&
                <div ref={areaRef}>
                    <TooltipWrap ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <TooltipTitle>
                            Метки
                        </TooltipTitle>
                        <MarkerInput/>
                        <Markers column={column} task={task}/>
                    </TooltipWrap>
                </div>
            }
        </>
    );
};

export default MarkerTooltip;