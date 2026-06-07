import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SoicalLogin from "../SocialLogin/SoicalLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handelRegister = (data) => {

        const imageFile = data.photo[0];

        createUser(data.email, data.password)
            .then(() => {

                const formData = new FormData();
                formData.append("image", imageFile)

                const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(imageUploadUrl, formData)
                    .then((res) => {
                        console.log("after image upload", res.data.data.display_url)

                        //update profile in firebase
                        const updateProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.display_url,
                        };

                        updateUserProfile(updateProfile)
                            .then(() => {
                                navigate(location?.state || '/')
                            })
                            .catch(err => console.log(err))

                    }

                    )


            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2 className="text-3xl font-extrabold text-center text-black">Create an Account</h2>
            <p className="text-center text-black mt-1 mb-3">Register with ZapShift</p>
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(handelRegister)}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text"
                            className="input w-full"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className="text-red-500">Name is required</p>}

                        <label className="label">Photo</label>
                        <input type="file"
                            className="file-input w-full"
                            placeholder="Name"
                            {...register("photo", { required: true })}
                        />
                        {errors.photo?.type === 'required' && <p className="text-red-500">Photo is required</p>}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input w-full"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>}

                        <label className="label">Password</label>
                        <input type="password"
                            className="input w-full"
                            placeholder="Password"
                            {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, minLength: 6 })}
                        />
                        {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                        {errors.password?.type === "pattern" && <p className="text-red-500">Password must have atleast a uppercase a lowercase letter a number and a digit</p>}
                        {errors.password?.type === "minLength" && <p className="text-red-500">Password must be of 6 characters or more</p>}
                        <button className="btn btn-primary mt-4">Register</button>

                    </fieldset>
                    <p className="mt-2">Already have an account? <Link state={location?.state} to="/login" className="text-blue-400 underline">Login</Link></p>
                </form>
                <SoicalLogin></SoicalLogin>
            </div>
        </div>
    );
};

export default Register;