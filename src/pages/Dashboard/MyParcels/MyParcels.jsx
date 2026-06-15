import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }

    })

    return (
        <div>
            <h2>All my parcels: {parcels.length}</h2>
        </div>
    );
};

export default MyParcels;