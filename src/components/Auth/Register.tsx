import React, {useEffect, useState} from 'react';
import StyledWrap from "./StyledComponents/StyledWrap";
import StyledForm from "./StyledComponents/StyledForm";
import StyledFormSection from "./StyledComponents/StyledFormSection";
import StyledFormTitle from "./StyledComponents/StyledFormTitle";
import StyledFormLabel from "./StyledComponents/StyledFormLabel";
import StyledFormInput from "./StyledComponents/StyledFormInput";
import StyledFormButton from "./StyledComponents/StyledFormButton";
import StyledFormSmall from "./StyledComponents/StyledFormSmall";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import fetchRegistration from "../../API/user/fetchRegistration";
import {IRegister} from "./register.interface";
import StyledFormError from "./StyledComponents/StyledFormError";


const Register = () => {
    const [error, setError] = useState('')
    const {auth} = useAppSelector(state => state.user.user)
    const {register, handleSubmit} = useForm<IRegister>()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async data => {
        let res = await fetchRegistration(data)
        if(typeof res !== 'string'){
            navigate('/login')
        } else{
            // @ts-ignore
            setError(res)
        }
    })

    return (
        <StyledWrap>
            <StyledForm onSubmit={onSubmit}>
                <StyledFormSection>
                    <StyledFormTitle>
                        Регистрация
                    </StyledFormTitle>
                </StyledFormSection>

                <StyledFormSection>
                    <StyledFormLabel>
                        Почта
                        <StyledFormInput type={'email'} {...register('email_address', {required: true})}/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Логин
                        <StyledFormInput type={'text'} {...register('login', {required: true})}/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Отображаемое имя
                        <StyledFormInput type={'text'} {...register('display_name', {required: true})}/>
                    </StyledFormLabel>

                    <StyledFormLabel>
                        Пароль
                        <StyledFormInput type={'password'} {...register('password', {required: true})}/>
                    </StyledFormLabel>
                </StyledFormSection>

                <StyledFormSection>
                    {
                        error.length?
                        <StyledFormError>
                            {error}
                        </StyledFormError>:
                        <></>
                    }
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