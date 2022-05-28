import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {addMarker, IMarker} from "../../../../../store/markers/markers.slice";
import {toggleMarker as toggleTaskMarker} from "../../../../../store/desks/desks.slice";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import Marker from "./Marker";
import StyledMarker from "./StyledMarker";

interface IMarkersProps {
    column: IColumn,
    task: ITask
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



const Markers = ({column, task}: IMarkersProps) => {
    const {markers} = useAppSelector(state => state.markers)
    const dispatch = useAppDispatch()

    const toggleMarker = (marker: IMarker) => dispatch(toggleTaskMarker({marker: marker, task: task, column: column}))
    const handleAddMarker = () => dispatch(addMarker())


    return (
        <>
            <StyledTitle>
                Метки
            </StyledTitle>
            <MarkersList>
                {
                    markers.map(marker => {
                        const isEnabled = !!task.markers.find(taskMarker => taskMarker.id === marker.id)
                        return (
                            <Marker key={marker.id} marker={marker} toggleMarker={toggleMarker} isEnabled={isEnabled}/>
                        )
                    })
                }
                <StyledMarker onClick={handleAddMarker}
                        color={'#fff'}
                        style={{
                            color: '#000',
                            border: '2px solid rgba(0, 0, 0, 0.2)',
                            marginTop: '10px'
                        }}>
                    Добавить новую метку
                </StyledMarker>
            </MarkersList>
        </>
    );
};

export default Markers;