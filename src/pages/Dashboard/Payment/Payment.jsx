import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
    
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
        </div>;
    }
    return (
        <div>
            <p>Please Pay</p>
            <p>Parcel Name : {parcel.parcelName}</p>
            <button className="btn btn-primary">Pay</button>
        </div>
    );
};

export default Payment;