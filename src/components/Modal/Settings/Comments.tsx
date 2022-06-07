import React, {useEffect, useState} from 'react';
import {Subtitle} from "./Subtitle";
import styled from "styled-components";
import BlueButton from "../../Button/BlueButton";
import {IColumn, ITask} from "../../../interfaces/desk.interface";
import {useAppDispatch} from "../../../store/hooks";
import addComment from "../../../API/tasks/addComment";
import getNameById from "../../../API/user/getNameById";
import Comment from "./Comment";

interface IComments {
    task: ITask,
    column: IColumn,
}

const AddCommentWrap = styled.div`
  position: relative;
  margin-top: 10px;
  background: #fff;

  &:hover, &:focus {
    outline: none;
    box-shadow: 9px 23px 43px -16px rgba(34, 60, 80, 0.2);
  }
`
const AddComment = styled.textarea`
  resize: none;
  min-height: 100px;
  width: 100%;
  font-family: inherit;
  padding: 10px;
  font-size: 14px;
  border: none;
  transition: 0.3s;

  &:focus {
    outline: none;
  }
`
const StyledComments = styled.ul`
  padding: 0;
  margin: 10px 0 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
`



const Comments = ({task, column}: IComments) => {
    const [comment, setComment] = useState('')
    const dispatch = useAppDispatch()

    const handleResize = (e: any) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    };
    const handleChange = (e: any) => setComment(e.target.value)
    const handleSave = () => dispatch(addComment({
        taskId: task.id,
        columnId: column.id,
        value: comment
    }))

    return (
        <>
            <Subtitle>Комментарии</Subtitle>
            <AddCommentWrap>
                <AddComment onInput={handleResize} onChange={handleChange} value={comment}
                            placeholder={'Напишите комментарий...'}/>
                <BlueButton onClick={handleSave}>
                    Сохранить
                </BlueButton>
            </AddCommentWrap>
            <StyledComments>
                {
                    task.comments.map(comment => (
                        <Comment key={comment.authorId + comment.text} comment={comment}/>
                    ))
                }
            </StyledComments>
        </>
    );
};

export default Comments;