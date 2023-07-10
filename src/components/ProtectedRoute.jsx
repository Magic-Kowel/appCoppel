import { Navigate,Outlet } from "react-router-dom";
import { IsLogged } from "../token";
export const ProtectedRoute = ({ children, redirectTo="/"}) =>{
    const {auth} = IsLogged();
    if(!auth){
        return <Navigate to={redirectTo}/>
    }
    return children  ? children : <Outlet />;
}