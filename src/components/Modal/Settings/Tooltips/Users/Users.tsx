import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import getUsers from "../../../../../API/user/getUsers";
import {MdDownloadDone} from "react-icons/md/index";
import {IUser} from "../../../../../interfaces/user.interface";

const StyledTitle = styled.div`
  width: 100%;
  margin-top: 20px;
`
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`
const StyledItem = styled.li`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 10px 0;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

interface IUsersProps {
    handleAdd: (id: number) => void,
    users?: IUser[],
}

const Users = ({users, handleAdd}: IUsersProps) => {
    const {current} = useAppSelector(state => ({
        current: state.desks.current,
    }))

    return (
        <>
            <StyledTitle>
                Участники доски
            </StyledTitle>
            <StyledList>
                {
                    users ? users.map(user => {
                        const deskUser = !!current!.users.find(deskUser => deskUser.id === user.id)

                        return (
                            <StyledItem key={user.id} onClick={() => handleAdd(user.id)}>
                                {user.displayName}, {user.login}
                                {deskUser ? <MdDownloadDone/> : <></>}
                            </StyledItem>
                        )
                    }): <></>
                }
            </StyledList>
        </>
    );
};

export default Users;