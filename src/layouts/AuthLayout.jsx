import Logo from "../components/logo/Logo";
import authImage from '../assets/authImage.png'
import { Outlet } from "react-router";
const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Logo></Logo>
            <div>
                <div>
                    <Outlet></Outlet>
                </div>
                <div>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;