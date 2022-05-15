import styled from "styled-components";

export const ColumnGhost = styled.div`
  color: #fff;
  overflow-wrap: break-word;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  font-stretch: 100%;
  line-height: 20px;
  height: 50px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 15px 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  min-width: 300px;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;  

  &:hover {
    background: rgb(235, 236, 240);
    color: ${({theme}) => theme.colors.fontGrey};
  }
`