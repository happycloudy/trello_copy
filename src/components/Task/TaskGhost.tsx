import styled from "styled-components";

interface ITaskGhostProps {
    color?: string
}

export const TaskGhost = styled.div<ITaskGhostProps>`
  padding: 5px 5px;
  background: #fff;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;
  color: ${props => props.color? props.color: 'inherit'};

  &:hover {
    background: rgba(100, 100, 100, 0.05);
  }
`