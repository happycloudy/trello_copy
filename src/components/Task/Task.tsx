import React, {useState} from 'react';
import styled from "styled-components";
import {ITask} from "../../interfaces/desk.interface";
import SettingsModal from "../Modal/Settings/SettingsModal";

const TaskWrap = styled.div`
  padding: 5px 5px;
  background: #fff;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(100, 100, 100, 0.05);
  }
`

const Task = (task: ITask) => {
    const [activeSettings, setActiveSettings] = useState(false)

    const handleOpenSettings = () => setActiveSettings(true)
    const handleCloseSettings = () => setActiveSettings(false)


    return (
        <>
            <SettingsModal task={task} active={activeSettings} handleClose={handleCloseSettings}/>
            <TaskWrap onClick={handleOpenSettings}>
                {task.title}
            </TaskWrap>
        </>
    );
};

export default Task;