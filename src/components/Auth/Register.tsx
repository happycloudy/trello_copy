import React from 'react';
import StyledWrap from "./StyledComponents/StyledWrap";
import StyledForm from "./StyledComponents/StyledForm";
import StyledFormSection from "./StyledComponents/StyledFormSection";
import StyledFormTitle from "./StyledComponents/StyledFormTitle";
import StyledFormLabel from "./StyledComponents/StyledFormLabel";
import StyledFormInput from "./StyledComponents/StyledFormInput";
import StyledFormButton from "./StyledComponents/StyledFormButton";
import StyledFormSmall from "./StyledComponents/StyledFormSmall";

const Register = () => {
    return (
        <StyledWrap>
            <StyledForm>
                <StyledFormSection>
                    <StyledFormTitle>
                        Регистрация
                    </StyledFormTitle>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormLabel>
                        Почта
                        <StyledFormInput/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Логин
                        <StyledFormInput/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Пароль
                        <StyledFormInput type={'password'}/>
                    </StyledFormLabel>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormButton>
                        Зарегистрироваться
                    </StyledFormButton>
                    <StyledFormSmall to={'/login'}>
                        Вход
                    </StyledFormSmall>
                </StyledFormSection>
            </StyledForm>
        </StyledWrap>
    );
};

export default Register;