import React from 'react';
import styled from "styled-components";
import {IMarker} from "../../../store/markers/markers.slice";
import {IColumn, ITask} from "../../../interfaces/desk.interface";

interface IMarkersProps {
    markers: IMarker[],
    task: ITask,
    column: IColumn,
}

interface IStyledMarkerProps {
    color: string
}

const StyledMarkers = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  max-width: 80%;
`
const StyledMarker = styled.div<IStyledMarkerProps>`
  background: ${props => props.color};
  padding: 7px;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
`

const Markers = ({markers}: IMarkersProps ) => {
    return (
        <StyledMarkers>
            {
                markers.map(marker => (
                    <StyledMarker color={marker.color} key={marker.id}>
                        {marker.text}
                    </StyledMarker>
                ))
            }
        </StyledMarkers>
    );
};

export default Markers;