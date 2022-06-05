import React, {useState} from 'react';
import styled from "styled-components";
import {AiOutlineEdit} from "react-icons/ai";
import {useAppDispatch} from "../../store/hooks";
import TextareaAutosize from "react-textarea-autosize";
import {IWorkSpace} from "../../interfaces/desk.interface";
import renameWorkspace from "../../API/workspaces/renameWorkspace";
import {FiTrash} from "react-icons/fi";
import deleteDesk from "../../API/desks/deleteDesk";
import deleteWorkspace from "../../API/workspaces/deleteWorkspace";

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
    const [editable, setEditable] = useState(false)
    const dispatch = useAppDispatch()

    const handleChange = (e: any, workspace: IWorkSpace) => {
        dispatch(renameWorkspace({value: e.target.value, id: workspace.id, path: 'name', op: 'add'}))
    }
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


    return (
        <>
            <Wrap onClick={handleSelectDesk}>
                <StyledDeskItem value={workspace.name}
                                onChange={(e: any) => handleChange(e, workspace)}
                                onKeyDown={(e: any) => handleKeyEnter(e, workspace)}
                                disabled={!editable}
                                onBlur={handleBlur}/>
            </Wrap>
            <SettingsWrap>
                <AiOutlineEdit style={{marginLeft: '10px'}} onClick={toggleRenameDesk}/>
                <FiTrash onClick={handleRemove}/>
            </SettingsWrap>
        </>
    );
};

export default DeskItem;