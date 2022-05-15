import React, {useState} from 'react';
import styled from "styled-components";
import {IColumn, ITask} from "../../interfaces/desk.interface";
import SettingsModal from "../Modal/Settings/SettingsModal";
import {FiTrash} from "react-icons/fi/index";
import {useAppDispatch} from "../../store/hooks";
import {removeTask} from "../../store/desks/desks.slice";

interface ITaskProps {
    task: ITask,
    column: IColumn,
}

const TaskWrap = styled.div`
  padding: 5px 5px;
  background: #fff;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(100, 100, 100, 0.05);
  }

  svg {
    display: none;
    transition: 0.3s;
  }
  
  &:hover svg {
    display: block;
  }
`

const Task = ({task, column}: ITaskProps) => {
    const [activeSettings, setActiveSettings] = useState(false)
    const dispatch = useAppDispatch()

    const handleOpenSettings = () => setActiveSettings(true)
    const handleCloseSettings = () => setActiveSettings(false)
    const handleRemove = () => dispatch(removeTask({task: task, column: column}))


    return (
        <>
            <SettingsModal task={task} column={column} active={activeSettings} handleClose={handleCloseSettings}/>
            <TaskWrap onClick={handleOpenSettings}>
                {task.title}
                <FiTrash onClick={handleRemove}/>
            </TaskWrap>
        </>
    );
};

export default Task;