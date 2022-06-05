import styled from "styled-components";

export const ColumnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 15px 10px;
  background: ${({theme}) => theme.colors.bgGrey};
  border-radius: 5px;
  min-width: 300px;
  height: max-content;
  position: relative;
`