import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
  
    if (loading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
        </div>;
    }
    if (!user) {
        return <Navigate to='/login' state={location?.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoutes;