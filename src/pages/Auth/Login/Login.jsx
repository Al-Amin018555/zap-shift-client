import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const handelLogin = (data) => {
        console.log(data);
        signIn(data.email, data.password)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2 className="text-3xl font-extrabold text-center text-black">Welcome Back</h2>
            <p className="text-center text-black mt-1 mb-3">Login with ZapShift</p>
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(handelLogin)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>}

                        <label className="label">Password</label>
                        <input type="password"
                            className="input"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                        <div><a className="link link-hover underline text-blue-400">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-2">Login</button>
                        <p className="mt-2">Don’t have any account? <Link to='/register' className="underline text-blue-400">Register</Link></p>
                        <div className="divider m-0">OR</div>
                    </fieldset>
                    <button className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;