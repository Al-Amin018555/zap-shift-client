import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
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
    const handleDeleteRider = id => {
        axiosSecure.delete(`/riders/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has deleted successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
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

                                    <button className="btn" onClick={() => document.getElementById(`modal-${rider._id}`).showModal()}> <FaEye /></button>

                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <dialog id={`modal-${rider._id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box space-y-2">
                                            <p>Name : {rider.name}</p>
                                            <p>Driving License Number : {rider.drivingLicenseNum}</p>
                                            <p>Region : {rider.riderRegion}</p>
                                            <p>Rider District : {rider.riderDistrict}</p>
                                            <p>Rider NID : {rider.nid}</p>
                                            <p>Phone Num : {rider.phoneNum}</p>
                                            <p>Bike Registration No : {rider.bikeRegNum}</p>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>

                                    <button

                                        onClick={() => handleRejection(rider)}
                                        className="btn hover:btn-primary">
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRider(rider._id)}
                                        className="btn hover:btn-primary">
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