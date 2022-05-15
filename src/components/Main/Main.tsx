import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Column from "../Column/Column";
import {ColumnGhost} from "../Column/ColumnGhost";
import {addColumn} from "../../store/desks/desks.slice";

const MainWrapper = styled.main`
  min-width: 100vw;
  min-height: calc(100vh - 44px);
  margin-top: 44px;
  background-size: cover;

  overflow-y: hidden;
`

const MainPicture = styled.img`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
`

const List = styled.div`
  display: flex;
  gap: 10px;
  padding: 30px 30px;
`

const Main = () => {
    const columns = useAppSelector(state => state.desks.current ? state.desks.current.columns : [])
    const dispatch = useAppDispatch()

    const handleCreate = () => dispatch(addColumn())
    return (
        <MainWrapper>
            <MainPicture src={'./assets/background.jpg'}/>
            <List>
                {
                    columns.map(column => (
                        <Column column={column} key={column.id}/>
                    ))
                }
                <ColumnGhost onClick={handleCreate}>
                    + Добавить еще одну колонку
                </ColumnGhost>
            </List>
        </MainWrapper>
    );
};

export default Main;