import React, {useEffect} from 'react';
import styled from "styled-components";

interface IUserInput {
    value: string,
    handleChange: (e:any) => void
}

const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid ${({theme}) => theme.colors.bgGrey};
  width: 100%;
  margin-top: 15px;
`

const UserInput = ({value, handleChange}: IUserInput) => {
    return (
        <StyledInput value={value} onChange={handleChange} placeholder={'Добавить участника...'}/>
    );
};

export default UserInput;