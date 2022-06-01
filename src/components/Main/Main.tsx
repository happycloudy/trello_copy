import React, {useState} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Column from "../Column/Column";
import {ColumnGhost} from "../Column/ColumnGhost";
import {addColumn, moveTask} from "../../store/desks/desks.slice";
import {IColumn, ITask} from "../../interfaces/desk.interface";

interface IDragConfig {
    task: ITask | undefined,
    from: IColumn | undefined,
}

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
    const {columns, currentDesk} = useAppSelector(state => ({
        columns: state.desks.current ? state.desks.current.columns : [],
        currentDesk: state.desks.current
    }))
    const [dragConfig, setDragConfig] = useState<IDragConfig>({
        task: undefined,
        from: undefined,
    })
    const dispatch = useAppDispatch()


    const handleCreate = () => dispatch(addColumn())

    const dragStartHandler = (e: any, column: IColumn, task: ITask) => {
        setDragConfig({task: task, from: column})
    }

    const dropHandler = (e: any, column: IColumn, task: ITask) => {
        e.preventDefault()

        if (column !== undefined && task !== undefined && dragConfig.from !== undefined && dragConfig.task !== undefined) {
            if(dragConfig.task !== task){
                // @ts-ignore
                dispatch(moveTask({
                    ...dragConfig,
                    to: column,
                    id: task.id
                }))
            }
        }
        e.target.style.boxShadow = 'none'
    }

    const dropColumnHandler = (e:any, column: IColumn) => {
        if (column !== undefined && dragConfig.from !== undefined && dragConfig.task !== undefined) {
            // @ts-ignore
            dispatch(moveTask({
                ...dragConfig,
                to: column,
            }))
        }
        e.target.style.boxShadow = 'none'
    }


    return (
        <MainWrapper>
            <MainPicture src={'./assets/background.jpg'}/>
            <List>
                {
                    columns.map(column => (
                        <Column column={column}
                                key={column.id}
                                dropHandler={dropHandler}
                                dragStartHandler={dragStartHandler}
                                dropColumnHandler={dropColumnHandler}/>
                    ))
                }

                {
                    currentDesk ?
                        <ColumnGhost onClick={handleCreate}>
                            + Добавить еще одну колонку
                        </ColumnGhost>:
                        <></>
                }
            </List>
        </MainWrapper>
    );
};

export default Main;