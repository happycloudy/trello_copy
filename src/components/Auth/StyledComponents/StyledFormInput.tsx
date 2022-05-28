import styled from "styled-components";

const StyledFormInput = styled.input`
  min-height: 30px;
  width: 20rem;
  padding: 7px 7px 7px 0;
  border: none;
  border-bottom: 1px solid #0079bf;
  box-sizing: border-box;
  font-family: inherit;
  transition: 0.2s;

  &:focus {

    outline: none;
    padding-left: 7px;
  }
`

export default StyledFormInput