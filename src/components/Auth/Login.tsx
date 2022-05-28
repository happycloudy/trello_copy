import React from 'react';
import StyledWrap from "./StyledComponents/StyledWrap";
import StyledForm from "./StyledComponents/StyledForm";
import StyledFormTitle from "./StyledComponents/StyledFormTitle";
import StyledFormSection from "./StyledComponents/StyledFormSection";
import StyledFormLabel from "./StyledComponents/StyledFormLabel";
import StyledFormInput from "./StyledComponents/StyledFormInput";
import StyledFormButton from "./StyledComponents/StyledFormButton";
import StyledFormSmall from "./StyledComponents/StyledFormSmall";

const Login = () => {
    return (
        <StyledWrap>
            <StyledForm>
                <StyledFormSection>
                    <StyledFormTitle>
                        Вход
                    </StyledFormTitle>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormLabel>
                        Почта
                        <StyledFormInput/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Пароль
                        <StyledFormInput type={'password'}/>
                    </StyledFormLabel>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormButton>
                        Войти
                    </StyledFormButton>
                    <StyledFormSmall to={'/register'}>
                        Регистрация
                    </StyledFormSmall>
                </StyledFormSection>
            </StyledForm>
        </StyledWrap>
    );
};

export default Login;