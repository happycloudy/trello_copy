import React from 'react';
import {ColumnWrap} from "./ColumnWrap";
import {IColumnProps} from "./column.interface";
import styled from "styled-components";

const ColumnTitle = styled.div`
  font-weight: 600;
  font-family: inherit;
  color: ${({theme}) => theme.colors.fontGrey};
  margin-left: 5px;
  cursor: pointer;
`

const Tasks = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`

const Task = styled.div`
  padding: 5px 5px;
  background: #fff;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  
  &:hover {
    background: rgba(100,100,100,0.05);
  }
`

const Column = ({column}: IColumnProps) => {
    return (
        <ColumnWrap>
            <ColumnTitle>{column.title}</ColumnTitle>
            <Tasks>
                {column.tasks.map(task => (
                    <Task key={task.id}>
                        {task.title}
                    </Task>
                ))}
            </Tasks>
        </ColumnWrap>
    );
};

export default Column;