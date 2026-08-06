import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    });


    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&riderDistrict=${selectedParcel?.senderDistrict}&workStatus=available`);
            console.log(res.data)
            return res.data;
        }

    })

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);
        modalRef.current.showModal();
    }

    const handleAssignRider = rider => {
        const assignRiderInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
        }

        axiosSecure.patch(`/parcels/${selectedParcel._id}/assign`, assignRiderInfo)
            .then(res => {
                if (res.data.success) {
                    modalRef.current.close();
                    parcelsRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Your rider has been assigned`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    return (
        <div>
            <h2 className="text-5xl">Assign Riders:{parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
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
                                <td>
                                    <button onClick={() => openAssignRiderModal(parcel)} className="btn btn-primary text-black">Find Riders</button>
                                </td>
                            </tr>)
                        }

                        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Riders: {riders.length}</h3>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                riders.map((rider, i) => <tr key={rider._id}>
                                                    <th>{i + 1}</th>
                                                    <td>{rider.name}</td>
                                                    <td>{rider.email}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleAssignRider(rider)}
                                                            className="btn btn-primary">Assign</button>
                                                    </td>
                                                </tr>)
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRiders;