import React from 'react';
import styled from "styled-components";

const MainWrapper = styled.main`
  width: 100vw;
  min-height: calc(100vh - 44px);
  background: #000;
  margin-top: 44px;
`

const MainImage = styled.img`
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
`

const Main = () => {
    return (
        <MainWrapper>
            <MainImage src={'./assets/background.jpg'}/>
        </MainWrapper>
    );
};

export default Main;