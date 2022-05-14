import styled from "styled-components";

export const HeaderWrap = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  color: #fff;
  background: hsl(311, 13.7%, 35.8%);
  height: 44px;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme}) => theme.order.header};
`