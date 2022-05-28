import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledFormSmall = styled(Link)`
  font-family: inherit;
  font-size: 14px;
  color: ${({theme}) => theme.colors.fontGrey};
  display: flex;
  justify-content: center;
`

export default StyledFormSmall