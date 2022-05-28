import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {useAppSelector} from "./store/hooks";


function App() {
    const {auth} = useAppSelector(state => state.user.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!auth) {
            navigate('/login')
        }
    }, [auth])

    return (
        <div>
            {
                auth ?
                    <Header/> :
                    <></>
            }

            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'*'} element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;
