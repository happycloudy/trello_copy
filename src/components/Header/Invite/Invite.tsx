import React, {useEffect, useRef, useState} from 'react';
import InviteWrap from "./InviteWrap";
import BlueButton from "../../Button/BlueButton";
import {usePopper} from "react-popper";
import {useDebounce, useOnClickOutside} from "../../../hooks";
import TooltipWrap from "../../Modal/Settings/Tooltips/TooltipWrap";
import TooltipTitle from "../../Modal/Settings/Tooltips/TooltipTitle";
import UserInput from "../../Modal/Settings/Tooltips/Users/UserInput";
import Users from "../../Modal/Settings/Tooltips/Users/Users";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import addUserToDesk from "../../../API/user/addUserToDesk";
import getDeskData from "../../../API/desks/getDeskData";
import fetchUsers from "../../../API/user/fetchUsers";

const Invite = () => {
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
    const {current} = useAppSelector(state => state.desks)
    const dispatch = useAppDispatch()

    const toggleActive = () => setActive(!active)
    const handleAdd = (id: number) => dispatch(addUserToDesk({userId: id, deskId: current!.id})).then(res => {
        if(res.payload) {
            // @ts-ignore
            dispatch(getDeskData(res.payload))
        }
    })
    useOnClickOutside(areaRef, () => setActive(false))

    useEffect(
        () => {
            if (debouncedValue) {
                console.log(debouncedValue)
                setLoading(true);
                fetchUsers(debouncedValue).then((results: any) => {
                    setLoading(false);
                    console.log(results)
                    setUsers(results);
                });
            } else {
                setUsers([]);
            }
        },
        [debouncedValue]
    );


    return (
        <InviteWrap>
            {
                current ?
                    <BlueButton ref={setReferenceElement} onClick={toggleActive}
                                style={{marginLeft: 0, marginBottom: 0, height: '44px'}}>
                        Пригласить пользователей
                    </BlueButton>:
                    <></>
            }
            {
                active &&
                <div ref={areaRef}>
                    <TooltipWrap ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <TooltipTitle>
                            Участники
                        </TooltipTitle>
                        <UserInput value={value} handleChange={(e:any) => setValue(e.target.value)}/>
                        <Users users={users} handleAdd={handleAdd}/>
                    </TooltipWrap>
                </div>
            }
        </InviteWrap>
    );
};

export default Invite;