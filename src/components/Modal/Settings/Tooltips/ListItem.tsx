import styled from "styled-components";

const ListItem = styled.li`
  padding: 5px 10px;
  background: ${({theme}) => theme.colors.bgGrey};
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  
  &:hover {
    background: ${({theme}) => theme.colors.bgGreyHover};
  }
`

export default ListItem