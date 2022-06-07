import React, {useState} from 'react';
import styled from "styled-components";
import {IComment} from "../../../interfaces/desk.interface";
import getNameById from "../../../API/user/getNameById";

interface ICommentProps {
    comment: IComment
}


const StyledComment = styled.li`
  padding: 10px;
  border-radius: 5%;
  background: #fff;
`

const CommentAuthor = styled.div`
  font-size: 16px;
`

const CommentText = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
`

const Comment = ({comment}: ICommentProps) => {
    const [author, setAuthor] = useState(comment.author)

    useState(() => {
        getNameById(comment.authorId).then(res => {
            setAuthor(res)
        })
    })

    return (
        <StyledComment >
            <CommentAuthor>
                {author}
            </CommentAuthor>
            <CommentText>
                {comment.text}
            </CommentText>
        </StyledComment>
    );
};

export default Comment;