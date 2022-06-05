import React from 'react';
import styled from "styled-components";
import StyledSubtitle from "./Tooltips/Subtitle";
import {useAppDispatch} from "../../../store/hooks";
import {IColumn, IDate, ITask} from "../../../interfaces/desk.interface";
import completeDate from "../../../API/desks/completeDate";

interface IDateProps {
    date: IDate,
    task: ITask,
    column: IColumn,
}

const StyledDateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
  margin-top: 10px;
`
const DateWrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`
const Data = styled.div`
  display: flex;
  background: ${({theme}) => theme.colors.bgGrey};
  padding: 7px;
  font-family: inherit;
  font-size: 14px;
  gap: 10px;
`
const CompletedDate = styled.div`
  background: #61BD4F;
  color: #fff;
  padding: 0 3px;
  border-radius: 10%;
`

const DateComponent = ({date, column, task}: IDateProps) => {
    const dispatch = useAppDispatch()

    const handleToggle = (e: any) => dispatch(completeDate({columnId: column.id, taskId: task.id, completed: e.target.checked}))
    return (
        date.date ?
            <StyledDateWrap>
                <StyledSubtitle>
                    Срок
                </StyledSubtitle>
                <DateWrap>
                    <input type="checkbox" checked={date.completed} onChange={handleToggle}/>
                    <Data>
                        {(new Date(date.date)).toLocaleString()}
                        {
                            date.completed? <CompletedDate>выполнено</CompletedDate>: <></>
                        }
                    </Data>
                </DateWrap>
            </StyledDateWrap> :
            <></>
    );
};

export default DateComponent;