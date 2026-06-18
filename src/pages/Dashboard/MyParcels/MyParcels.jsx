import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            console.log(res.data)
            return res.data;
        }

    })

    const handleParcelDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        //updating ui after delete
                        refetch()
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }

        });
    }

    // const handlePayment = async (parcel) => {
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         name: parcel.parcelName,
    //         parcelId: parcel._id,
    //         senderEmail: parcel.senderEmail,
    //     };

    //     const res = await axiosSecure.post('/payment-checkout-session',paymentInfo);

    //     console.log(res.data.url);

    //     window.location.href = res.data.url;
    // }

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-8 rounded-2xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) =>
                                <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === "paid" ?
                                                <span className="text-green-400">Paid</span>
                                                :
                                                <Link to={`/dashboard/parcels/${parcel._id}`}>
                                                    <button className="btn btn-sm btn-primary">Pay</button>
                                                </Link>

                                                // <button
                                                //     onClick={() => handlePayment(parcel)}
                                                //     className="btn btn-sm btn-primary"
                                                // >
                                                //     Pay
                                                // </button>

                                        }
                                    </td>
                                    <td>Blue</td>
                                    <td>
                                        <button className="btn btn-square hover:bg-primary">
                                            <FaMagnifyingGlass></FaMagnifyingGlass>
                                        </button>
                                        <button className="btn btn-square hover:bg-primary mx-2">
                                            <FiEdit></FiEdit>
                                        </button>
                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className="btn btn-square hover:bg-primary">
                                            <FaTrashCan></FaTrashCan>
                                        </button>

                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;