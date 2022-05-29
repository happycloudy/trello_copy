import React, {useState} from 'react';
import styled from "styled-components";
import {AiOutlineEdit} from "react-icons/ai";
import {IDesk, IWorkSpace} from "../../../interfaces/desk.interface";
import {renameDesk} from "../../../store/desks/desks.slice";
import {useAppDispatch} from "../../../store/hooks";
import TextareaAutosize from "react-textarea-autosize";

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


const DeskItem = ({desk, handleSelect}:IDeskItemProps) => {
    const [editable, setEditable] = useState(false)
    const dispatch = useAppDispatch()

    const handleChange = (e: any, desk: IDesk) => {
        dispatch(renameDesk({desk: desk, name: e.target.value}))
    }
    const toggleRenameDesk = () => setEditable(!editable)
    const handleSelectDesk = () => {
        if(!editable){
            handleSelect()
        }
    }
    const handleKeyEnter = (e: any) => {
        if (e.keyCode === 13) {
            setEditable(false)
            console.log('Новое название - ' + e.target.value)
        }
    }
    const handleBlur = () => setEditable(false)


    return (
       <>
           <Wrap onClick={handleSelectDesk}>
               <StyledDeskItem value={desk.name}
                               onChange={(e:any) => handleChange(e, desk)}
                               onKeyDown={handleKeyEnter}
                               disabled={!editable}
                               onBlur={handleBlur}/>
           </Wrap>
           <AiOutlineEdit style={{marginLeft: '10px'}} onClick={toggleRenameDesk}/>
       </>
    );
};

export default DeskItem;