import { Navigate, Outlet } from "react-router-dom";
import Auth from '../utils/auth';

const Authorization = () => {
    const loggedIn = Auth.loggedIn();

    return (
        loggedIn ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default Authorization;