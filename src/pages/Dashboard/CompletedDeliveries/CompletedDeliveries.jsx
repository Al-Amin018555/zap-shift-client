import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'parcel_delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`);
            return res.data;
        }
    });
    return (
        <div>
            <h2 className="text-4xl">Completed Deliveries:{parcels.length}</h2>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Created At</th>
                        <th>Pickup District</th>
                        
                    </tr>
                </thead>
                <tbody>

                    {
                        parcels.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.senderDistrict}</td>
                           
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CompletedDeliveries; 