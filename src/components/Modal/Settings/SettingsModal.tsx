import React, {useRef} from 'react';
import ModalWrap from "../ModalWrap";
import styled from "styled-components";
import {useOnClickOutside} from "../../../hooks";
import {IColumn, ITask} from "../../../interfaces/desk.interface";
import TextArea from "../../TextArea/TextArea";
import TextareaAutosize from 'react-textarea-autosize';
import {useAppDispatch} from "../../../store/hooks";
import {renameTask} from "../../../store/desks/desks.slice";
import {CloseIcon} from "../../Icons/CloseIcon";
import Aside from "./Aside";
import Description from "./Description";
import Comments from "./Comments";

interface ISettingsModalProps {
    active: boolean,
    handleClose: () => void,
    task: ITask,
    column: IColumn,
}

const Modal = styled.div`
  background: #f4f5f7;
  border-radius: 5px;
  padding: 20px 15px;
  min-width: 50vw;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Title = styled(TextareaAutosize)`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  resize: none;
  cursor: text;
  border: none;
  padding: 5px 10px;
  width: 100%;
  font-family: inherit;
  overflow: hidden;
  overflow-wrap: break-word;
  display: block;
`
const TitleSmall = styled.div`
  font-size: 14px;
  margin-left: 5px;
  margin-top: 5px;
`
const UnderlineText = styled.span`
  text-decoration: underline;
  color: #055a8c;
`
const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-left: 5px;
`
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 3;
`
const DescriptionWrap = styled.section`
  display: flex;
  flex-direction: column;
`
const CommentsWrap = styled.section`
  display: flex;
  flex-direction: column;
`


const SettingsModal = ({active, handleClose, task, column}: ISettingsModalProps) => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()

    const handleChange = (e: any) => dispatch(renameTask({column: column, task: task, title: e.target.value}))
    useOnClickOutside(ref, () => {
        handleClose()
    })

    return (
        active ?
            <ModalWrap>
                <Modal ref={ref}>
                    <CloseIcon onClick={handleClose}/>
                    <div>
                        <TextArea value={task.title} handleChange={handleChange} StyledTextArea={Title} wrapStyle={`
                            width: 90%;
                        `}/>
                        <TitleSmall>
                            В колонке <UnderlineText>{column.title}</UnderlineText>
                        </TitleSmall>
                    </div>
                    <ContentWrap>
                        <TextWrap>
                            <DescriptionWrap>
                                <Description task={task}/>
                            </DescriptionWrap>
                            <CommentsWrap>
                                <Comments/>
                            </CommentsWrap>
                        </TextWrap>

                        <Aside/>
                    </ContentWrap>
                </Modal>
            </ModalWrap> :
            <></>
    );
};

export default SettingsModal;