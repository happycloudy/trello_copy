import React from 'react';
import {Subtitle} from "./Subtitle";
import styled from "styled-components";

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

const SubmitCommentBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: none;
  background: #0079bf;
  color: #fff;
  font-family: inherit;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #055a8c;
  }
`

const CommentsWrap = styled.div`

`

const Comments = () => {
    const handleResize = (e: any) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";
    };

    return (
        <>
            <Subtitle>Комментарии</Subtitle>
            <CommentsWrap>

            </CommentsWrap>
            <AddCommentWrap>
                <AddComment onInput={handleResize} placeholder={'Напишите комментарий...'}/>
                <SubmitCommentBtn>
                    Сохранить
                </SubmitCommentBtn>
            </AddCommentWrap>
        </>
    );
};

export default Comments;