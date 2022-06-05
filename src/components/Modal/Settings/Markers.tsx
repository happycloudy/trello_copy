import React from 'react';
import styled from "styled-components";
import {IMarker} from "../../../store/markers/markers.slice";
import {IColumn, ITask} from "../../../interfaces/desk.interface";
import StyledSubtitle from "./Tooltips/Subtitle";

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
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
  margin-top: 10px;
`
const StyledMarkersWrap = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
`
const StyledMarker = styled.div<IStyledMarkerProps>`
  background: ${props => props.color};
  padding: 7px;
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
`

const Markers = ({markers}: IMarkersProps) => {
    return (
        markers.length ?
            <StyledMarkers>
                <StyledSubtitle>
                    Метки
                </StyledSubtitle>
                <StyledMarkersWrap>
                    {
                        markers.map(taskMarker => {
                            const marker = markers.find(marker => marker.id === taskMarker.id)
                            return (
                                <StyledMarker color={marker!.color} key={marker!.id}>
                                    {marker!.text}
                                </StyledMarker>
                            )
                        })
                    }
                </StyledMarkersWrap>
            </StyledMarkers> :
            <></>
    );
};

export default Markers;