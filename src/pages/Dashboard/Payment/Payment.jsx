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

    const handlePayment = async () => {

        const paymentInfo = {
            cost: parcel.cost,
            senderEmail: parcel.senderEmail,
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        window.location.href = res.data.url;
    }

    return (
        <div>
            <p>Please pay ${parcel.cost} for: {parcel.parcelName}</p>

            <button
                onClick={handlePayment}
                className="btn btn-primary">Pay</button>
        </div>
    );
};

export default Payment;