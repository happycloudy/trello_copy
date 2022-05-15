import React from 'react';
import {Subtitle} from "./Subtitle";
import styled from "styled-components";

const AddCommentWrap = styled.div`
  position: relative;
  margin-top: 10px;
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

  &:hover, &:focus {
    outline: none;
    box-shadow: 9px 23px 43px -16px rgba(34, 60, 80, 0.2);
  }
`

const SubmitCommentBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border: none;
  background: #0079bf;
  color: #fff;
  font-family: inherit;
  border-radius: 4px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #055a8c;
  }
`

const CommentsWrap = styled.div`

`

const Comments = () => {
    return (
        <>
            <Subtitle>Комментарии</Subtitle>
            <CommentsWrap>

            </CommentsWrap>
            <AddCommentWrap>
                <AddComment placeholder={'Напишите комментарий...'}/>
                <SubmitCommentBtn>
                    Сохранить
                </SubmitCommentBtn>
            </AddCommentWrap>
        </>
    );
};

export default Comments;