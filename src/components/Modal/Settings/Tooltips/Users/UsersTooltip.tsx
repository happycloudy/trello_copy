import React, {useEffect, useRef, useState} from 'react';
import {usePopper} from "react-popper";
import ListItem from "../ListItem";
import TooltipWrap from "../TooltipWrap";
import TooltipTitle from "../TooltipTitle";
import UserInput from "./UserInput";
import Users from "./Users";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import {useDebounce, useOnClickOutside} from "../../../../../hooks";
import fetchUsers from "../../../../../API/user/fetchUsers";

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



    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const debouncedValue: string = useDebounce<string>(value, 500);
    const handleAdd = (id: number) => {}
    const toggleActive = () => setActive(!active)
    useOnClickOutside(areaRef, () => setActive(false))


    useEffect(
        () => {
            if (debouncedValue) {
                console.log(debouncedValue)
                setLoading(true);
                fetchUsers(debouncedValue).then((results: any) => {
                    setLoading(false);
                    setUsers(results);
                });
            } else {
                setUsers([]);
            }
        },
        [debouncedValue]
    );

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
                        <UserInput value={value} handleChange={(e:any) => setValue(e.target.value)}/>
                        <Users handleAdd={handleAdd}/>
                    </TooltipWrap>
                </div>
            }
        </>
    );
};

export default UsersTooltip;