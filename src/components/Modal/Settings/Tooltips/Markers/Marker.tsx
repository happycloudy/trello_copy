import React, {useRef, useState} from 'react';
import {AiOutlineCheck, AiOutlineEdit} from "react-icons/ai";
import EditMarkerField from "./EditMarkerField";
import styled from "styled-components";
import {IMarker} from "../../../../../store/markers/markers.slice";
import StyledMarker from "./StyledMarker";
import {useOnClickOutside} from "../../../../../hooks";


interface IMarkerProps {
    toggleMarker: (marker: IMarker) => void,
    marker: IMarker,
    isEnabled: boolean,
}


const MarkerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`
const EditBtn = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  border-radius: 2px;

  &:hover {
    background: ${({theme}) => theme.colors.bgGrey};
  }
`


const Marker = ({toggleMarker, marker, isEnabled}: IMarkerProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const ref = useRef(null)
    const handleEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)

    useOnClickOutside(ref, handleCloseEdit)

    return (
        <MarkerWrap ref={ref}>
            {
                !openEdit ?
                    <>
                        <StyledMarker onClick={() => toggleMarker(marker)} color={marker.color}>
                            {marker.text}
                            {isEnabled && <AiOutlineCheck/>}
                        </StyledMarker>
                        <EditBtn onClick={handleEdit}>
                            <AiOutlineEdit/>
                        </EditBtn>
                    </>:
                    <EditMarkerField marker={marker} handleClose={handleCloseEdit}/>
            }
        </MarkerWrap>
    );
};

export default Marker;