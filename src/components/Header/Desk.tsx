import styled from "styled-components";

export const Desk = styled.div`
  position: relative;
  margin-left: 5px;
`

export const CurrentDesk = styled.button`
  transition: 0.3s;
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  user-select: none;
  border: none;
  background: transparent;
  font-family: inherit;
  color: inherit;
  font-weight: 400;
  font-size: 1rem;
  
  &:hover {
    cursor: pointer;
    background: rgba(255,255,255,0.2);
  }
`