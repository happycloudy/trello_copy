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
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import fetchLogin from "../../API/user/fetchLogin";
import {ILogin} from "./login.interface";

const Login = () => {
    const {auth} = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm<ILogin>()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => {
        dispatch(fetchLogin(data))
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
                        Логин
                        <StyledFormInput type={'text'} {...register('username', {required: true})}/>
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