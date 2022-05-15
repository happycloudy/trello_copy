import React, {useRef, useState} from 'react';
import ModalWrap from "../ModalWrap";
import styled from "styled-components";
import {useOnClickOutside} from "../../../hooks";
import {ITask} from "../../../interfaces/desk.interface";

interface ISettingsModalProps {
    active: boolean,
    handleClose: () => void,
    task: ITask,
}

const Modal = styled.div`
  background: #f4f5f7;
  border-radius: 5px;
  padding: 20px 15px;
`

const TitleWrap = styled.div`
  cursor: text;
`
const Title = styled.textarea`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  resize: none;
  cursor: text;
  border: none;
`


const SettingsModal = ({active, handleClose, task}: ISettingsModalProps) => {
    const [editTitle, setEditTitle] = useState(true)
    const ref = useRef(null)

    const handleEditTitle = () => setEditTitle(false)
    const handleEnd = (e: any) => {
        setEditTitle(true)
        console.log('Новое название - ' + e.target.value)
    }
    useOnClickOutside(ref, (e) => {
        // handleEnd(e)
        handleClose()
    })

    return (
        active ?
            <ModalWrap>
                <Modal ref={ref}>
                    <TitleWrap onClick={handleEditTitle}>
                        <Title defaultValue={task.title}
                               disabled={editTitle}
                               spellCheck={false}
                               dir={'auto'}
                               maxLength={512}
                               onBlur={handleEnd}
                        />
                    </TitleWrap>
                </Modal>
            </ModalWrap> :
            <></>
    );
};

export default SettingsModal;