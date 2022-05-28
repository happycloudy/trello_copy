import React, {useState} from 'react';
import {editMarker, IMarker} from "../../../../../store/markers/markers.slice";
import styled from "styled-components";
import {useAppDispatch} from "../../../../../store/hooks";

interface IEditMarkerProps {
    marker: IMarker,
    handleClose: () => void,
}
interface IStyledButtonProps {
    color?: string
}

const StyledInput = styled.input`
  height: 30px;
  padding: 5px;
`

const StyledButton = styled.button<IStyledButtonProps>`
  background: transparent;
  padding: 10px 15px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${(props) => props.color || '#3498db'};
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    box-shadow: 0 0 5px 2px ${(props) => props.color || '#3498db'};
  }
`

const StyledEditMarker = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`


const EditMarkerField = ({marker, handleClose}: IEditMarkerProps) => {
    const [text, setText] = useState(marker.text)
    const [color, setColor] = useState(marker.color)
    const dispatch = useAppDispatch()


    const handleSubmit = () => {
        dispatch(editMarker({marker: marker, text: text, color: color}))
        handleClose()
    }


    return (
        <StyledEditMarker>
            <StyledInput type={'text'} value={text} onChange={(e:any) => setText(e.target.value)}/>
            <StyledInput type={'color'} value={color} onChange={(e:any) => setColor(e.target.value)}/>
            <StyledButton color={color} onClick={handleSubmit}>
                Сохранить изменения
            </StyledButton>
        </StyledEditMarker>
    );
};

export default EditMarkerField;