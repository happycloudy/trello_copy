import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {AiOutlineEdit} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import TextareaAutosize from "react-textarea-autosize";
import {IWorkSpace} from "../../interfaces/desk.interface";
import renameWorkspace from "../../API/workspaces/renameWorkspace";
import {FiTrash} from "react-icons/fi";
import deleteWorkspace from "../../API/workspaces/deleteWorkspace";
import {useDebounce} from "../../hooks";

interface IDeskItemProps {
    workspace: IWorkSpace,
    handleSelect: () => void,
}

const Wrap = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledDeskItem = styled(TextareaAutosize)`
  resize: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  height: 25px;
  overflow-y: hidden;
  cursor: pointer;
  padding-left: 5px;
  color: ${({theme}) => theme.colors.font};

  &:disabled {
    background: transparent;
  }
`
const SettingsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 25px;
`


const DeskItem = ({workspace, handleSelect}: IDeskItemProps) => {
    const [value, setValue] = useState(workspace.name)
    const debouncedName: string = useDebounce<string>(value, 500);
    const [editable, setEditable] = useState(false)
    const {current} = useAppSelector(state => state.workspaces)
    const dispatch = useAppDispatch()

    const handleSave = () => {
        dispatch(renameWorkspace({value: value, id: workspace.id, path: 'name', op: 'add'}))
    }

    const handleChange = (e: any) => setValue(e.target.value)
    const toggleRenameDesk = () => setEditable(!editable)
    const handleSelectDesk = () => {
        if (!editable) {
            handleSelect()
        }
    }
    const handleKeyEnter = (e: any, workspace: IWorkSpace) => {
        if (e.keyCode === 13) {
            setEditable(false)
            dispatch(renameWorkspace({value: e.target.value, id: workspace.id, path: 'name', op: 'add'}))
        }
    }
    const handleBlur = () => setEditable(false)
    const handleRemove = () => dispatch(deleteWorkspace(workspace.id))


    useEffect(
        () => {
            if (debouncedName && debouncedName !== workspace.name) {
                handleSave()
            }
        },
        [debouncedName]
    );

    return (
        <>
            <Wrap onClick={handleSelectDesk}>
                <StyledDeskItem value={value}
                                onChange={handleChange}
                                onKeyDown={(e: any) => handleKeyEnter(e, workspace)}
                                disabled={!editable}
                                onBlur={handleBlur}/>
            </Wrap>
            <SettingsWrap>
                <AiOutlineEdit style={{marginLeft: '10px'}} onClick={toggleRenameDesk}/>
                {
                    current && current.id !== workspace.id ?
                        <FiTrash onClick={handleRemove}/>:
                        <></>
                }

            </SettingsWrap>
        </>
    );
};

export default DeskItem;