import styled from "styled-components";
import chroma from "chroma-js";

interface IStyledMarkerProps {
    color: string,
}

const StyledMarker = styled.li<IStyledMarkerProps>`
  color: #fff;
  padding: 5px;
  border-radius: 2px;
  font-weight: 700;
  cursor: pointer;
  background: ${props => props.color};
  transition: 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 3;

  &:hover {
    box-shadow: -5px 0 ${props => chroma(props.color).darken().hex()};
  }
`

export default StyledMarker