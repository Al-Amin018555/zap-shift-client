import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading:roleLoading, data: role = "user" } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = axiosSecure.get(`/users/${user.email}/role`)
            console.log(res.data);
            return res.data;
        }
    });
    return { roleLoading, role }
};

export default useRole;