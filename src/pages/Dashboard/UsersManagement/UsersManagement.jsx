import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            console.log(res.data);
            return res.data
        }
    })

    const handleUserRole = (user, role) => {
        console.log(user, role);
        const roleInfo = { role: role };
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {

                if (res.data.modifiedCount) {
                    refetch()

                    const message =
                        role === "admin"
                            ? `${user.displayName} made as an Admin`
                            : `${user.displayName} removed from Admin`;

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            )

    }
    const handleMakeAdmin = (user, role) => {
        handleUserRole(user, role)
    }

    const handleRemoveAdmin = (user, role) => {
        handleUserRole(user, role)
    }
    return (
        <div>
            <h2 className="text-4xl">Manage Users:{users.length} </h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="user photo" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    {
                                        user.role === 'admin' ?
                                            <button
                                                onClick={() => handleRemoveAdmin(user, "user")}
                                                className="btn bg-red-300"><FaUserSlash></FaUserSlash></button> :
                                            <button
                                                onClick={() => handleMakeAdmin(user, "admin")}
                                                className="btn bg-green-400"><FaUserShield></FaUserShield></button>
                                    }
                                </th>
                            </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UsersManagement;