import React from 'react';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {useAppSelector} from "./store/hooks";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


function App() {
    const {auth} = useAppSelector(state => state.user.user)
    
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
