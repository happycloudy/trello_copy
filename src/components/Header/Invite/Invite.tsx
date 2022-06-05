import React, {useRef, useState} from 'react';
import InviteWrap from "./InviteWrap";
import BlueButton from "../../Button/BlueButton";
import {usePopper} from "react-popper";
import {useOnClickOutside} from "../../../hooks";
import TooltipWrap from "../../Modal/Settings/Tooltips/TooltipWrap";
import TooltipTitle from "../../Modal/Settings/Tooltips/TooltipTitle";
import UserInput from "../../Modal/Settings/Tooltips/Users/UserInput";
import Users from "../../Modal/Settings/Tooltips/Users/Users";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import addUserToDesk from "../../../API/user/addUserToDesk";
import getDeskData from "../../../API/desks/getDeskData";

const Invite = () => {
    const {current} = useAppSelector(state => state.desks)
    const [active, setActive] = useState<boolean>(false)
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);
    const areaRef = useRef(null)
    const {styles, attributes} = usePopper(
        referenceElement,
        popperElement,
        {modifiers: [{name: 'offset', options: {offset: [0, 10]},}]}
    );
    const dispatch = useAppDispatch()

    const toggleActive = () => setActive(!active)
    const handleAdd = (id: number) => dispatch(addUserToDesk({userId: id, deskId: current!.id})).then(res => {
        if(res.payload) {
            // @ts-ignore
            dispatch(getDeskData(res.payload))
        }
    })
    useOnClickOutside(areaRef, () => setActive(false))

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
                        <UserInput/>
                        <Users handleAdd={handleAdd}/>
                    </TooltipWrap>
                </div>
            }
        </InviteWrap>
    );
};

export default Invite;