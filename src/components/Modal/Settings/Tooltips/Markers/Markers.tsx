import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import chroma from "chroma-js";
import {addMarker, IMarker} from "../../../../../store/markers/markers.slice";
import {toggleMarker as toggleTaskMarker} from "../../../../../store/desks/desks.slice";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import {AiOutlineCheck} from "react-icons/ai/index";
import {AiOutlineEdit} from "react-icons/ai";

interface IMarkersProps {
    column: IColumn,
    task: ITask
}

interface IStyledMarkerProps {
    color: string,
}

const StyledTitle = styled.div`
  width: 100%;
  margin-top: 20px;
`
const MarkersList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 0 0;
`
const Marker = styled.li<IStyledMarkerProps>`
  color: #fff;
  padding: 5px;
  border-radius: 2px;
  font-weight: 700;
  cursor: pointer;
  background: ${props => props.color};
  transition: 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 3;

  &:hover {
    box-shadow: -5px 0 ${props => chroma(props.color).darken().hex()};
  }
`
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

const Markers = ({column, task}: IMarkersProps) => {
    const {markers} = useAppSelector(state => state.markers)
    const dispatch = useAppDispatch()

    const toggleMarker = (marker: IMarker) => dispatch(toggleTaskMarker({marker: marker, task: task, column: column}))
    const handleAddMarker = () => dispatch(addMarker())
    const handleEdit = () => {
        console.log('редактируется')
    }

    return (
        <>
            <StyledTitle>
                Метки
            </StyledTitle>
            <MarkersList>
                {
                    markers.map(marker => {
                        const isEnabled = task.markers.find(taskMarker => taskMarker.id === marker.id)
                        return (
                            <MarkerWrap key={marker.id}>
                                <Marker onClick={() => toggleMarker(marker)} color={marker.color}>
                                    {marker.text}
                                    {isEnabled && <AiOutlineCheck/>}
                                </Marker>
                                <EditBtn onClick={handleEdit}>
                                    <AiOutlineEdit/>
                                </EditBtn>
                            </MarkerWrap>
                        )
                    })
                }
                <Marker onClick={handleAddMarker}
                        color={'#fff'}
                        style={{
                            color: '#000',
                            border: '2px solid rgba(0, 0, 0, 0.2)',
                            marginTop: '10px'
                        }}>
                    Добавить новую метку
                </Marker>
            </MarkersList>
        </>
    );
};

export default Markers;