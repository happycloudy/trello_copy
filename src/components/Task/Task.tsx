import React, {useState} from 'react';
import styled from "styled-components";
import {IColumn, ITask} from "../../interfaces/desk.interface";
import SettingsModal from "../Modal/Settings/SettingsModal";
import {FiTrash} from "react-icons/fi/index";
import {useAppDispatch} from "../../store/hooks";
import {moveTask, removeTask} from "../../store/desks/desks.slice";

interface ITaskProps {
    task: ITask,
    column: IColumn,
    dropHandler: (e: any, column: IColumn, task: ITask) => void,
    dragStartHandler: (e: any, column: IColumn, task: ITask) => void
}


interface ITaskWrapProps {
    highlighted?: boolean
}

const TaskWrap = styled.div<ITaskWrapProps>`
  padding: 5px 5px;
  background: #fff;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: ${(props) => props.highlighted ? '0px 0px 10px 10px rgba(30,30,30,0.5)' : 'none'};

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

const Task = ({task, column, dragStartHandler, dropHandler}: ITaskProps) => {

    const [activeSettings, setActiveSettings] = useState(false)
    const dispatch = useAppDispatch()


    const handleOpenSettings = () => setActiveSettings(true)
    const handleCloseSettings = () => setActiveSettings(false)
    const handleRemove = () => dispatch(removeTask({task: task, column: column}))

    const dragOverHandler = (e: any) => {
        e.preventDefault()
        e.target.style.boxShadow = '0 4px 3px gray'
    }
    const dragLeaveHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }

    const dragEndHandler = (e: any) => {
        e.target.style.boxShadow = 'none'
    }


    return (
        <>
            <SettingsModal task={task} column={column} active={activeSettings} handleClose={handleCloseSettings}/>
            <TaskWrap draggable={true}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, column, task)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, column, task)}
                      onClick={handleOpenSettings}>
                {task.title}
                <div style={{minWidth: '16px'}}>
                    <FiTrash onClick={handleRemove}/>
                </div>
            </TaskWrap>
        </>
    );
};

export default Task;