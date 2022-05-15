import React, {useState} from 'react';
import {ColumnWrap} from "./ColumnWrap";
import {IColumnProps} from "./column.interface";
import styled from "styled-components";
import Task from "../Task/Task";

const TitleWrap = styled.div`
  cursor: pointer;
  margin-left: 5px;
  height: 28px;
`

const ColumnTitle = styled.textarea`
  color: ${({theme}) => theme.colors.fontGrey};
  overflow-wrap: break-word;
  resize: none;
  border: none;
  height: 28px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  font-stretch: 100%;
  line-height: 20px;
`

const Tasks = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`



const Column = ({column}: IColumnProps) => {
    const [editTitle, setEditTitle] = useState(true)

    const handleEditTitle = () => setEditTitle(false)
    const handleEnd = (e: any) => {
        setEditTitle(true)
        console.log('Новое название - ' + e.target.value)
    }

    return (
        <ColumnWrap>
            <TitleWrap onClick={handleEditTitle}>
                <ColumnTitle defaultValue={column.title}
                             disabled={editTitle}
                             spellCheck={false}
                             dir={'auto'}
                             maxLength={512}
                             onBlur={handleEnd}
                />
            </TitleWrap>
            <Tasks>
                {column.tasks.map(task => (
                    <Task key={task.id} {...task}/>
                ))}
            </Tasks>
        </ColumnWrap>
    );
};

export default Column;