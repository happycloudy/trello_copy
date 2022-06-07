import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {IMarker} from "../../../../../store/markers/markers.slice";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import Marker from "./Marker";
import StyledMarker from "./StyledMarker";
import addMarkerToTask from "../../../../../API/tasks/addMarkerToTask";
import removeMarkerFromTask from "../../../../../API/tasks/removeMarkerFromTask";
import addMarker from "../../../../../API/markers/addMarker";

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
    const {markers, current} = useAppSelector(state => ({
        markers: state.markers.markers,
        current: state.desks.current
    }))
    const dispatch = useAppDispatch()

    const toggleMarker = (marker: IMarker) => {
        const isHaveMarker = task.markers.find(taskMarker => taskMarker.id === marker.id)
        if(isHaveMarker) {
            dispatch(removeMarkerFromTask({marker: marker, taskId: task.id, columnId: column.id}))
        } else {
            dispatch(addMarkerToTask({marker: marker, taskId: task.id, columnId: column.id}))
        }
    }
    const handleAddMarker = () => dispatch(addMarker({
        markerId: markers.reduce((curr, next) => curr < next.id ? next.id : curr, 0) + 1,
        deskId: current!.id,
    }))


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