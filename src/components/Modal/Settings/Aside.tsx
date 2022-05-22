import styled from "styled-components";
import UsersTooltip from "./Tooltips/Users/UsersTooltip";
import ListItem from "./Tooltips/ListItem";
import {IColumn, ITask} from "../../../interfaces/desk.interface";
import MarkerTooltip from "./Tooltips/Markers/MarkerTooltip";

interface IAsideProps {
    task: ITask,
    column: IColumn
}

const AsideWrap = styled.aside`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`
const AsideTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
`
const AsideList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const Aside = ({column, task}: IAsideProps) => {
    return (
        <AsideWrap>
            <AsideTitle>
                Добавить на карточку
            </AsideTitle>
            <AsideList>
                <UsersTooltip task={task} column={column}/>
                <MarkerTooltip task={task} column={column}/>
                <ListItem>
                    Даты
                </ListItem>
            </AsideList>
        </AsideWrap>
    )
}

export default Aside