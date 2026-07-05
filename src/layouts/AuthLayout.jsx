import Logo from "../components/logo/Logo";
import authImage from '../assets/authImage.png'
import { Outlet } from "react-router";
const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto h-screen">
            <Logo></Logo>
            <div className="flex items-center mt-10">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1">
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;