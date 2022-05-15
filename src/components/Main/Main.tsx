import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../store/hooks";
import Column from "../Column/Column";

const MainWrapper = styled.main`
  width: 100vw;
  min-height: calc(100vh - 44px);
  margin-top: 44px;
  background: url("./assets/background.jpg") no-repeat;
  background-size: cover;
  padding: 30px 30px;
`

const List = styled.div`
  display: flex;
  gap: 10px;
`

const Main = () => {
    const columns = useAppSelector(state => state.desks.current? state.desks.current.columns: [])

    return (
        <MainWrapper>
            <List>
                {
                    columns.map(column => (
                        <Column column={column} key={column.id}/>
                    ))
                }
            </List>
        </MainWrapper>
    );
};

export default Main;