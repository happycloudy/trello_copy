import React from 'react';
import {Subtitle} from "./Subtitle";
import {ITask} from "../../../interfaces/desk.interface";
import styled from "styled-components";

interface IDescriptionProps {
    task: ITask
}

const DescriptionArea = styled.textarea`
  min-height: 100px;
  width: 100%;
  resize: none;
  border: none;
  margin-top: 10px;
  padding: 10px;
  font-family: inherit;
  font-size: 14px;
  background: ${({theme}) => theme.colors.bgGrey};
  transition: 0.3s;
  cursor: pointer;
  
  &:focus {
    background: #fff;
  }
  
  &:hover:not(:focus) {
    background: ${({theme}) => theme.colors.bgGreyHover};
  }
`

const Description = ({task}: IDescriptionProps) => {
    return (
        <>
            <Subtitle>Описание</Subtitle>
            <DescriptionArea placeholder={'Добавьте более подробное описание...'}/>
        </>
    );
};

export default Description;