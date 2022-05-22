import React, {useEffect, useRef, useState} from 'react';
import styled, {StyledComponent} from "styled-components";

interface ITextAreaProps {
    value: string,
    handleChange: (e: any) => void,
    StyledTextArea: StyledComponent<any, any>,
    wrapStyle?: string
}

interface IWrapProps {
    styles?: string,
}

const Wrap = styled.div<IWrapProps>`
  cursor: pointer;
  width: 100%;
  ${props => props.styles}
`

const TextArea = ({value, handleChange, StyledTextArea, wrapStyle}: ITextAreaProps) => {
    const [edit, setEdit] = useState(false)
    const ref = useRef<any>(null);

    const handleEditStart = () => setEdit(true)
    const handleEditEnd = (e: any) => {
        setEdit(false)
        console.log('Новое название - ' + e.target.value)
    }

    const handleKeyEnter = (e: any) => {
        if (e.keyCode === 13) {
            setEdit(false)
            console.log('Новое название - ' + e.target.value)
        }
    }

    useEffect(() => {
        if (ref.current && edit) {
            ref.current.focus();
        }
    }, [edit]);

    return (
        <Wrap onClick={handleEditStart} styles={wrapStyle}>
            <StyledTextArea
                value={value}
                disabled={!edit}
                spellCheck={false}
                dir={'auto'}
                ref={ref}
                maxLength={512}
                onBlur={handleEditEnd}
                onChange={handleChange}
                onKeyDown={handleKeyEnter}
            />
        </Wrap>
    );
};

export default TextArea;