import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [serachText,setSearchText] = useState('');
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users',serachText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${serachText}`);
            console.log(res.data);
            return res.data
        }
    })

    const handleUserRole = (user, role) => {
        console.log(user, role);
        const roleInfo = { role: role };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
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
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                onChange={(e) => setSearchText(e.target.value)}
                type="search" 
                required 
                placeholder="Search" />
            </label>
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