import React, {useEffect, useRef, useState} from 'react';
import styled, {StyledComponent} from "styled-components";
import {useDebounce} from "../../hooks";

interface ITextAreaProps {
    value: string,
    handleChange: (value: any) => void,
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
    const [text, setText] = useState(value)
    const debouncedText: string = useDebounce<string>(text, 500);
    const [edit, setEdit] = useState(false)
    const ref = useRef<any>(null);

    const handleChangeText = (e: any) => setText(e.target.value)
    const handleEditStart = () => setEdit(true)
    const handleEditEnd = (e: any) => {
        setEdit(false)
    }

    const handleKeyEnter = (e: any) => {
        if (e.keyCode === 13) {
            setEdit(false)
        }
    }

    useEffect(() => {
        if (ref.current && edit) {
            ref.current.focus();
        }
    }, [edit]);


    useEffect(
        () => {
            if (debouncedText && debouncedText !== value) {
                handleChange(text)
            }
        },
        [debouncedText]
    );

    return (
        <Wrap onClick={handleEditStart} styles={wrapStyle}>
            <StyledTextArea
                value={text}
                disabled={!edit}
                spellCheck={false}
                dir={'auto'}
                ref={ref}
                maxLength={512}
                onBlur={handleEditEnd}
                onChange={handleChangeText}
                onKeyDown={handleKeyEnter}
            />
        </Wrap>
    );
};

export default TextArea;