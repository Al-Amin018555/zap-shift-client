import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
    const { roleLoading, role } = useRole();
    if (roleLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
        </div>;
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'rider') {
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;