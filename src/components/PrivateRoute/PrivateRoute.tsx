import {useAppSelector} from "../../store/hooks";
import {Navigate} from "react-router-dom";
import React, {ReactComponentElement} from "react";

interface IPrivateRouteProps {
    children: ReactComponentElement<any>
}
const PrivateRoute = ({children}: IPrivateRouteProps) => {
    const {auth} = useAppSelector(state => state.user.user)
    return auth ? children : <Navigate to={'/login'}/>
}

export default PrivateRoute