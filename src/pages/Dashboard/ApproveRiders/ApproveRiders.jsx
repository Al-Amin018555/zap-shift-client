import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (rider, status) => {

        const updateInfo = { status: status, email: rider.email };
        console.log(rider, status);
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
               
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your application has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, "approved");

    }
    const handleRejection = rider => {
        updateRiderStatus(rider, "rejected");
    }
    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval: {riders.length}</h2>
            <div className="overflow-x-auto p-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.riderDistrict}</td>
                                <td>
                                    <p className={`${rider.status === "approved" ?
                                        "text-green-500" : "text-red-500"}`}>
                                        {rider.status}
                                    </p>

                                </td>
                                <td>
                                    <button
                                        onClick={() => handleApproval(rider)}
                                        className="btn hover:btn-primary">
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRejection(rider)}
                                        className="btn mx-2 hover:btn-primary">
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className="btn hover:btn-primary">
                                        <FaTrashCan />
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

export default ApproveRiders;