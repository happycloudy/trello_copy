import styled from "styled-components";

const StyledFormTitle = styled.div`
  font-family: inherit;
  font-size: 35px;
  font-weight: 600;
  padding: 7px;
  position: relative;
  text-align: center;
  
  &::before {
    content: '';
    background: #0079bf;
    height: 4px;
    border-radius: 10px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`

export default StyledFormTitle