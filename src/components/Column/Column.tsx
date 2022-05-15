import React from 'react';
import {ColumnWrap} from "./ColumnWrap";
import {IColumnProps} from "./column.interface";
import styled from "styled-components";
import Task from "../Task/Task";
import TextArea from "../TextArea/TextArea";
import {useAppDispatch} from "../../store/hooks";
import {addTask, renameColumn} from "../../store/desks/desks.slice";
import {TaskGhost} from "../Task/TaskGhost";


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

const AddIcon = styled.div`
  display: inline;
  position: relative;
  width: 15px;
  margin-right: 25px;

  &::before, &::after {
    content: ' ';
    position: absolute;
    width: 13px;
    height: 2px;
    left: 50%;
    top: 50%;
    background: #5e6c84;
  }
  
  &::after {
    transform: rotate(90deg);
  }
`


const Column = ({column}: IColumnProps) => {
    const dispatch = useAppDispatch()

    const handleChange = (e: any) => dispatch(renameColumn({column: column, title: e.target.value}))
    const handleCreateTask = () => dispatch(addTask({column: column}))

    return (
        <ColumnWrap>
            <TextArea value={column.title} handleChange={handleChange} StyledTextArea={ColumnTitle}/>
            <Tasks>
                {column.tasks.map(task => (
                    <Task key={task.id} column={column} task={task}/>
                ))}
                <TaskGhost color={'#5e6c84'} onClick={handleCreateTask}>
                    <AddIcon/>Добавить карточку
                </TaskGhost>
            </Tasks>
        </ColumnWrap>
    );
};

export default Column;