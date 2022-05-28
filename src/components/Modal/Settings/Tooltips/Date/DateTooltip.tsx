import React, {useRef, useState} from 'react';
import ListItem from "../ListItem";
import {IColumn, ITask} from "../../../../../interfaces/desk.interface";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {usePopper} from "react-popper";
import {useOnClickOutside} from "../../../../../hooks";
import TooltipWrap from "../TooltipWrap";
import TooltipTitle from "../TooltipTitle";
import {useAppDispatch} from "../../../../../store/hooks";
import {selectDate} from "../../../../../store/desks/desks.slice";
import BlueButton from "../../../../Button/BlueButton";

interface IDateTooltipProps {
    task: ITask,
    column: IColumn
}
interface IStyledButtonProps {
    bg?: string,
    color?: string,
}

const StyledDataPicker = styled(DatePicker)`
  position: absolute;
  left: 0;
  top: 0;
`
const StyledButton = styled(BlueButton)<IStyledButtonProps>`
  min-width: 200px;
  margin-top: 10px;
  
  background: ${({theme, ...props}) => props.bg === 'grey'? theme.colors.bgGrey :props.bg || ''};
  color: ${props => props.color || ''};
  &:hover {
    background: ${({theme, ...props}) => props.bg === 'grey'? theme.colors.bgGreyHover :props.bg || ''};
  }
`

const DateTooltip = ({column, task}: IDateTooltipProps) => {
    const [date, setDate] = useState(task.date.date ? new Date(task.date.date) : new Date())
    const [active, setActive] = useState<boolean>(false)
    const [referenceElement, setReferenceElement] = useState<any>(null);
    const [popperElement, setPopperElement] = useState<any>(null);
    const areaRef = useRef(null)
    const {styles, attributes} = usePopper(
        referenceElement,
        popperElement,
        {modifiers: [{name: 'offset', options: {offset: [0, 10]},}]}
    );
    const dispatch = useAppDispatch()

    const toggleActive = () => setActive(!active)
    const handleChange = (e: any) => setDate(e)
    const handleSubmit = () => {
        dispatch(selectDate({column: column, task: task, date: date.toISOString()}))
        setActive(false)
    }
    const handleClear = () => {
        dispatch(selectDate({column: column, task: task, date: ''}))
        setActive(false)
    }
    const handleClose = () => {
        setDate(task.date.date ? new Date(task.date.date) : new Date())
        setActive(false)
    }
    useOnClickOutside(areaRef, handleClose)

    return (
        <>
            <ListItem ref={setReferenceElement} onClick={toggleActive}>
                Даты
            </ListItem>
            {
                active &&
                <div ref={areaRef}>
                    <TooltipWrap ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <TooltipTitle>
                            Даты
                        </TooltipTitle>
                        <StyledDataPicker selected={date}
                                          onChange={handleChange}
                                          inline
                                          showTimeSelect
                                          timeFormat="HH:mm"
                                          timeIntervals={1}/>
                        <StyledButton onClick={handleSubmit}>
                            Сохранить
                        </StyledButton>

                        <StyledButton bg={'grey'} color={'#000'} onClick={handleClear}>
                            Удалить
                        </StyledButton>
                    </TooltipWrap>
                </div>
            }
        </>
    );
};

export default DateTooltip;