import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {AiOutlineEdit} from "react-icons/ai";
import {IDesk} from "../../../interfaces/desk.interface";
import {useAppDispatch} from "../../../store/hooks";
import TextareaAutosize from "react-textarea-autosize";
import renameDesk from "../../../API/desks/renameDesk";
import {FiTrash} from "react-icons/fi";
import deleteDesk from "../../../API/desks/deleteDesk";
import {useDebounce} from "../../../hooks";

interface IDeskItemProps {
    desk: IDesk,
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


const DeskItem = ({desk, handleSelect}:IDeskItemProps) => {
    const [value, setValue] = useState(desk.name)
    const debouncedName: string = useDebounce<string>(value, 500);
    const [editable, setEditable] = useState(false)
    const dispatch = useAppDispatch()

    const handleSave = () => {
        dispatch(renameDesk({value: value, id: desk.id, path: 'board_name', op: 'add'}))
    }
    const handleChange = (e: any) => setValue(e.target.value)
    const toggleRenameDesk = () => setEditable(!editable)
    const handleSelectDesk = () => {
        if(!editable){
            handleSelect()
        }
    }
    const handleKeyEnter = (e: any) => {
        if (e.keyCode === 13) {
            setEditable(false)
            renameDesk({value: e.target.value, id: desk.id, path: 'board_name', op: 'add'})
        }
    }
    const handleBlur = () => setEditable(false)
    const handleRemove = () => dispatch(deleteDesk(desk.id))


    useEffect(
        () => {
            if (debouncedName && debouncedName !== desk.name) {
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
                               onKeyDown={handleKeyEnter}
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