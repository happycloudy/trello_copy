import React from 'react';
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid ${({theme}) => theme.colors.bgGrey};
  width: 100%;
  margin-top: 15px;
`

const MarkerInput = () => {
    return (
        <StyledInput placeholder={'Поиск меток...'}/>
    );
};

export default MarkerInput