import React from 'react';
import {ColumnWrap} from "./ColumnWrap";
import {IColumnProps} from "./column.interface";
import styled from "styled-components";
import Task from "../Task/Task";
import TextArea from "../TextArea/TextArea";
import {useAppDispatch} from "../../store/hooks";
import {TaskGhost} from "../Task/TaskGhost";
import TextareaAutosize from "react-textarea-autosize";
import createTask from "../../API/tasks/createTask";
import renameColumn from "../../API/columns/renameColumn";
import {FiTrash} from "react-icons/fi";
import deleteColumn from "../../API/columns/deleteColumn";


const ColumnTitle = styled(TextareaAutosize)`
  color: ${({theme}) => theme.colors.fontGrey};
  overflow-wrap: break-word;
  resize: none;
  border: none;
  min-height: 28px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  font-stretch: 100%;
  line-height: 20px;
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
const DeleteIconWrap = styled.div`
  position: absolute;
  min-width: 16px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`


const Column = ({column, dragStartHandler, dropHandler, dropColumnHandler}: IColumnProps) => {
    const dispatch = useAppDispatch()

    const handleRemove = () => dispatch(deleteColumn(column.id))
    const handleChange = (e: any) => dispatch(renameColumn({value: e.target.value, id: column.id, path: 'Name', op: 'add'}))
    const handleCreateTask = () => dispatch(createTask({column_id: column.id, name: 'Новая карточка'}))
    const dragOverHandler = (e: any) => {
        e.preventDefault()
    }

    return (
        <ColumnWrap onDrop={(e:any) => dropColumnHandler(e, column)} onDragOver={dragOverHandler}>
            <TextArea value={column.title} handleChange={handleChange} StyledTextArea={ColumnTitle}/>
            <DeleteIconWrap >
                <FiTrash onClick={handleRemove}/>
            </DeleteIconWrap>
            <Tasks>
                {column.tasks.map(task => (
                    <Task key={task.id} column={column} task={task} dragStartHandler={dragStartHandler} dropHandler={dropHandler}/>
                ))}
                <TaskGhost color={'#5e6c84'} onClick={handleCreateTask}>
                    <AddIcon/>Добавить карточку
                </TaskGhost>
            </Tasks>
        </ColumnWrap>
    );
};

export default Column;