import styled from "styled-components";
import React from 'react';
import {IDeskItemProps, ISelectDeskProps, ISelectDeskWrapProps} from "./desk-list.interface";


export const SelectDeskWrap = styled.ul<ISelectDeskWrapProps>`
  display: ${props => props.active ? 'block': 'none'};
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  top: 40px;
  background: rgba(255,255,255,0.95);
  color: #000;
  border-radius: 5px;
  list-style: none;

`

export const DeskItem = styled.li<IDeskItemProps>`
  padding: 10px 10px;
  white-space: nowrap;
  margin-top: ${props => props.topDivider? props.topDivider: 0};
  user-select: none;

  &:hover {
    cursor: pointer;
    background: rgba(101, 78, 97, ${props => props.hoverDarkness? props.hoverDarkness : 0.2});
  }
`

const SelectDesk = ({children, active, refer}: ISelectDeskProps) => {
    return (
        <SelectDeskWrap active={active} ref={refer}>
            {children}
        </SelectDeskWrap>
    );
};

export default SelectDesk;