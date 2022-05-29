import React, {useEffect} from 'react';
import StyledWrap from "./StyledComponents/StyledWrap";
import StyledForm from "./StyledComponents/StyledForm";
import StyledFormTitle from "./StyledComponents/StyledFormTitle";
import StyledFormSection from "./StyledComponents/StyledFormSection";
import StyledFormLabel from "./StyledComponents/StyledFormLabel";
import StyledFormInput from "./StyledComponents/StyledFormInput";
import StyledFormButton from "./StyledComponents/StyledFormButton";
import StyledFormSmall from "./StyledComponents/StyledFormSmall";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";

const Login = () => {
    const {auth} = useAppSelector(state => state.user.user)
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    useEffect(() => {
        if(auth){
            navigate('/')
        }
    })

    return (
        <StyledWrap>
            <StyledForm onSubmit={onSubmit}>
                <StyledFormSection>
                    <StyledFormTitle>
                        Вход
                    </StyledFormTitle>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormLabel>
                        Почта
                        <StyledFormInput type={'email'} {...register('emailAddress', {required: true})}/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Пароль
                        <StyledFormInput type={'password'} {...register('password', {required: true})}/>
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