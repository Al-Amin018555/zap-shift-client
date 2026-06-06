import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SoicalLogin from "../SocialLogin/SoicalLogin";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth()
    const handelRegister = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => console.log(res))
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
                        <p className="mt-2">Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link></p>
                </form>
                <SoicalLogin></SoicalLogin>
            </div>
        </div>
    );
};

export default Register;