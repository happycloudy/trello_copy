import React, {useState} from 'react';
import styled, {StyledComponent} from "styled-components";

interface ITextAreaProps {
    value: string,
    handleChange: (e: any) => void,
    StyledTextArea: StyledComponent<"textarea", any>
}

const Wrap = styled.div`
  cursor: pointer;
  height: 28px;
  width: fit-content;
`

const TextArea = ({value, handleChange, StyledTextArea}: ITextAreaProps) => {
    const [edit, setEdit] = useState(false)

    const handleEditStart = () => setEdit(true)
    const handleEditEnd = (e: any) => {
        setEdit(false)
        console.log('Новое название - ' + e.target.value)
    }

    const handleKeyEnter = (e: any) => {
        if(e.keyCode === 13){
            setEdit(false)
            console.log('Новое название - ' + e.target.value)
        }
    }

    return (
        <Wrap onClick={handleEditStart}>
            <StyledTextArea
                value={value}
                disabled={!edit}
                spellCheck={false}
                dir={'auto'}
                maxLength={512}
                onBlur={handleEditEnd}
                onChange={handleChange}
                onKeyDown={handleKeyEnter}
            />
        </Wrap>
    );
};

export default TextArea;