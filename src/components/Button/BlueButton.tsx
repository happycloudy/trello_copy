import styled from "styled-components";

const BlueButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: none;
  background: #0079bf;
  color: #fff;
  font-family: inherit;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #055a8c;
  }
`

export default BlueButton