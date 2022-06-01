import React, {useRef, useState} from 'react';
import SelectDesk, {DeskListItem} from "./Desk/DeskList";
import {CurrentDesk, Desk} from "./Desk/Desk";
import {IWorkSpace} from "../../interfaces/desk.interface";
import {useOnClickOutside} from "../../hooks";
import TextBold from "./TextBold";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import WorkspaceItem from "./WorkspaceItem";
import {createWorkspace, selectWorkspace} from "../../store/workspaces/workspace.slice";

const Workspaces = () => {
    const ref = useRef(null)
    const [activeDeskList, setActiveDeskList] = useState(false)
    const {workspaces, current} = useAppSelector(state => state.workspaces)
    const dispatch = useAppDispatch()

    const handleToggle = () => setActiveDeskList(!activeDeskList)
    const handleSelect = (workspace: IWorkSpace) => {
        dispatch(selectWorkspace(workspace))
        setActiveDeskList(false)
    }
    const handleCreate = () => dispatch(createWorkspace())

    useOnClickOutside(ref, () => setActiveDeskList(false))

    return (
        <>
            <TextBold>
                Рабочее пространство
            </TextBold>
            <Desk>
                <CurrentDesk onClick={handleToggle}>
                    {current ? current.name : 'Не выбрано'}
                </CurrentDesk>

                <SelectDesk active={activeDeskList} refer={ref}>
                    {
                        workspaces.map(workspace => (
                            <DeskListItem key={workspace.id}>
                                <WorkspaceItem workspace={workspace} handleSelect={() => handleSelect(workspace)}/>
                            </DeskListItem>
                        ))
                    }
                    <DeskListItem hoverDarkness={0.3} topDivider={'10px'}
                                  onClick={handleCreate}>
                        + Добавить новую доску
                    </DeskListItem>
                </SelectDesk>
            </Desk>
        </>
    );
};

export default Workspaces;