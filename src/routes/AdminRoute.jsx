import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { roleLoading, role } = useRole();

    if (loading || roleLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
        </div>;
    }

    if (role !== 'admin') {
        return <div><p className='text-5xl text-red-500'>Access is forbidden</p></div>
    }
    return children;
};

export default AdminRoute;