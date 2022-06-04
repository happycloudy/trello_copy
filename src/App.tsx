import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import fetchInfo from "./API/user/fetchInfo";


function App() {
    const navigate = useNavigate()
    const {auth} = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(token) {
            dispatch(fetchInfo(token)).then(res => {
                // @ts-ignore
                if(res.payload.hasOwnProperty('user_id')){
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
        </div>
    );
}

export default App;
