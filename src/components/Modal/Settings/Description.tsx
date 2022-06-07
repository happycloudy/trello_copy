import React, {useEffect, useState} from 'react';
import {Subtitle} from "./Subtitle";
import {IColumn, ITask} from "../../../interfaces/desk.interface";
import styled from "styled-components";
import {useDebounce} from "../../../hooks";
import {useAppDispatch} from "../../../store/hooks";
import saveDescription from "../../../API/tasks/saveDescription";

interface IDescriptionProps {
    task: ITask,
    column: IColumn,
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

const Description = ({task, column}: IDescriptionProps) => {
    const [description, setDescription] = useState(task.description)
    const debouncedName: string = useDebounce<string>(description, 500);

    const handleResize = (e: any) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    };
    const handleChange = (e: any) => setDescription(e.target.value)
    const dispatch = useAppDispatch()

    useEffect(
        () => {
            if (debouncedName && debouncedName !== task.description) {
                dispatch(saveDescription({
                    taskId: task.id,
                    columnId: column.id,
                    value: description
                }))
            }
        },
        [debouncedName]
    );

    return (
        <>
            <Subtitle>Описание</Subtitle>
            <DescriptionArea onInput={handleResize} value={description} onChange={handleChange} placeholder={'Добавьте более подробное описание...'}/>
        </>
    );
};

export default Description;