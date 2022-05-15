import React from 'react';
import {createPortal} from "react-dom";
import styled from "styled-components";

interface IModalWrapProps {
    children: React.ReactNode
}

const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000000a3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({theme}) => theme.order.modal};
`

const ModalWrap = ({children}: IModalWrapProps) => createPortal( <ModalBackground>{children}</ModalBackground>, document.body)

export default ModalWrap;