import styled from "styled-components";

export const CloseIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 17px;
  height: 17px;
  cursor: pointer;
  
  &::before, &::after {
    content: ' ';
    cursor: pointer;
    position: absolute;
    top: 50%;
    height: 2px;
    width: 17px;
    background: #5e6c84;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`