import React, {useRef, useState} from 'react';
import {HeaderWrap} from "./HeaderWrap";
import {CurrentDesk, Desk} from "./Desk/Desk";
import SelectDesk, {DeskListItem} from "./Desk/DeskList";
import {useOnClickOutside} from "../../hooks";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {createDesk, selectDesk} from "../../store/desks/desks.slice";
import {IDesk} from "../../interfaces/desk.interface";
import DeskItem from "./Desk/DeskItem";
import Workspaces from "./Workspaces";
import TextBold from "./TextBold";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = () => {
    const [activeDeskList, setActiveDeskList] = useState(false)
    const ref = useRef<any>(null)
    const {desks, workspaces} = useAppSelector(state => ({desks: {...state.desks}, workspaces: {...state.workspaces}}))
    const dispatch = useAppDispatch()

    const handleToggle = () => setActiveDeskList(!activeDeskList)
    const handleSelect = (desk: IDesk) => {
        dispatch(selectDesk(desk))
        setActiveDeskList(false)
    }
    const handleCreate = () => dispatch(createDesk())

    useOnClickOutside(ref, () => setActiveDeskList(false))


    return (
        <HeaderWrap>
            <Wrap>
                <Workspaces/>
            </Wrap>

            {
                workspaces.workspaces.length && desks.desks.length ?
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
        </HeaderWrap>
    );
};

export default Header;