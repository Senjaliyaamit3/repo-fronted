import react from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({children}) => {
    const isAuthenticate = localStorage.getItem("token")

    return isAuthenticate?children:<Navigate to={"/login"}/>
}

export default AuthRoute