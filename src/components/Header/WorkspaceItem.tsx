import React, {useState} from 'react';
import styled from "styled-components";
import {AiOutlineEdit} from "react-icons/ai";
import {useAppDispatch} from "../../store/hooks";
import TextareaAutosize from "react-textarea-autosize";
import {IWorkSpace} from "../../interfaces/desk.interface";
import renameWorkspace from "../../API/workspaces/renameWorkspace";

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

const DeskItem = ({workspace, handleSelect}: IDeskItemProps) => {
    const [editable, setEditable] = useState(false)
    const dispatch = useAppDispatch()

    const handleChange = (e: any, desk: IWorkSpace) => {
        dispatch(renameWorkspace({value: e.target.value, id: desk.id, path: '/Name', op: 'add'}))
    }
    const toggleRenameDesk = () => setEditable(!editable)
    const handleSelectDesk = () => {
        if (!editable) {
            handleSelect()
        }
    }
    const handleKeyEnter = (e: any, desk: IWorkSpace) => {
        if (e.keyCode === 13) {
            setEditable(false)
            dispatch(renameWorkspace({value: e.target.value, id: desk.id, path: '/Name', op: 'add'}))
        }
    }
    const handleBlur = () => setEditable(false)


    return (
        <>
            <Wrap onClick={handleSelectDesk}>
                <StyledDeskItem value={workspace.name}
                                onChange={(e: any) => handleChange(e, workspace)}
                                onKeyDown={(e: any) => handleKeyEnter(e, workspace)}
                                disabled={!editable}
                                onBlur={handleBlur}/>
            </Wrap>
            <AiOutlineEdit style={{marginLeft: '10px'}} onClick={toggleRenameDesk}/>
        </>
    );
};

export default DeskItem;