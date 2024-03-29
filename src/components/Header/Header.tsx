import React, {useRef, useState} from 'react';
import {HeaderWrap} from "./HeaderWrap";
import {CurrentDesk, Desk} from "./Desk/Desk";
import SelectDesk, {DeskListItem} from "./Desk/DeskList";
import {useOnClickOutside} from "../../hooks";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {IDesk} from "../../interfaces/desk.interface";
import DeskItem from "./Desk/DeskItem";
import Workspaces from "./Workspaces";
import TextBold from "./TextBold";
import createDesk from "../../API/desks/createDesk";
import getDeskData from "../../API/desks/getDeskData";
import Invite from "./Invite/Invite";
import {BiExit} from "react-icons/bi/index";
import {logout} from "../../store/user/user.slice";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Exit = styled(BiExit)`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`

const Header = () => {
    const [activeDeskList, setActiveDeskList] = useState(false)
    const ref = useRef<any>(null)
    const {desks, workspaces, user} = useAppSelector(state => ({
        desks: {...state.desks},
        workspaces: {...state.workspaces},
        user: {...state.user.user}
    }))
    const dispatch = useAppDispatch()

    const handleToggle = () => setActiveDeskList(!activeDeskList)
    const handleSelect = (desk: IDesk) => {
        dispatch(getDeskData(desk.id))
        setActiveDeskList(false)
    }
    const handleCreate = () => {
        dispatch(createDesk({
            owner_Id: user.id,
            workspace_id: workspaces.current!.id,
            board_name: 'Новая доска',
        }))
    }
    const handleExit = () => {
      dispatch(logout())
    }

    useOnClickOutside(ref, () => setActiveDeskList(false))


    return (
        <HeaderWrap>
            <Wrap>
                <Workspaces/>
            </Wrap>

            {
                workspaces.workspaces.length && workspaces.current ?
                    <Wrap>
                        <TextBold>
                            Текущая доска:
                        </TextBold>
                        <Desk>
                            <CurrentDesk onClick={handleToggle}>
                                {desks.current ? desks.current.name : 'Не выбрана'}
                            </CurrentDesk>

                            <SelectDesk active={activeDeskList} refer={ref}>
                                {
                                    desks.desks.map(desk => (
                                        <DeskListItem key={desk.id}>
                                            <DeskItem desk={desk} handleSelect={() => handleSelect(desk)}/>
                                        </DeskListItem>
                                    ))
                                }
                                <DeskListItem hoverDarkness={0.3} topDivider={'10px'} onClick={handleCreate}>
                                    + Добавить новую доску
                                </DeskListItem>
                            </SelectDesk>
                        </Desk>
                    </Wrap> :
                    <></>
            }

            <Invite/>
            <Exit onClick={handleExit}/>
        </HeaderWrap>
    );
};

export default Header;