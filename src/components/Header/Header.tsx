import React, {useRef, useState} from 'react';
import {HeaderWrap} from "./HeaderWrap";
import {CurrentDesk, Desk} from "./Desk";
import SelectDesk, {DeskItem} from "./DeskList";
import {useOnClickOutside} from "../../hooks";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {createDesk, selectDesk} from "../../store/desks/desks.slice";
import {IDesk} from "../../interfaces/desk.interface";

const TextBold = styled.div`
  font-weight: 600;
`

const Header = () => {
    const [activeDeskList, setActiveDeskList] = useState(false)
    const ref = useRef<any>(null)
    const {desks, current} = useAppSelector(state => state.desks)
    const dispatch = useAppDispatch()


    const handleToggle = () => setActiveDeskList(!activeDeskList)
    const handleSelect = (desk: IDesk) => dispatch(selectDesk(desk))
    const handleCreate = () => dispatch(createDesk())
    useOnClickOutside(ref, () => setActiveDeskList(false))

    return (
        <HeaderWrap>
            <TextBold>
                Текущая доска:
            </TextBold>
            <Desk>
                <CurrentDesk onClick={handleToggle}>
                    {current ? current.name: 'Не выбрана'}
                </CurrentDesk>

                <SelectDesk active={activeDeskList} refer={ref}>
                    {
                        desks.map(desk => (
                            <DeskItem key={desk.id} onClick={() => handleSelect(desk)}>
                                {desk.name}
                            </DeskItem>
                        ))
                    }
                    <DeskItem hoverDarkness={0.3} topDivider={'10px'} onClick={handleCreate}>
                        + Добавить новую доску
                    </DeskItem>
                </SelectDesk>
            </Desk>
        </HeaderWrap>
    );
};

export default Header;