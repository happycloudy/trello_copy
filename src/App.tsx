import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import fetchInfo from "./API/user/fetchInfo";
import Loader from "./components/Loader/Loader";


function App() {
    const navigate = useNavigate()
    const {auth, isLoading} = useAppSelector(state => ({
        auth: state.user.user.auth,
        isLoading: state.user.loading || state.workspaces.loading || state.desks.loading,
    }))
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            dispatch(fetchInfo(token)).then(res => {
                // @ts-ignore
                if (res.payload.hasOwnProperty('Id')) {
                    navigate('/')
                }
            })
        }
    }, [])

    return (
        <div>
            {
                auth ?
                    <Header/> :
                    <></>
            }

            <Routes>
                <Route path={'/'} element={<PrivateRoute><Main/></PrivateRoute>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'*'} element={<PrivateRoute><Main/></PrivateRoute>}/>
            </Routes>

            {
                isLoading ?
                    <Loader/> :
                    <></>
            }
        </div>
    );
}

export default App;
