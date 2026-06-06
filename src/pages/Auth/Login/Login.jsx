import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SoicalLogin from "../SocialLogin/SoicalLogin";
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
                            className="input w-full"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>}

                        <label className="label">Password</label>
                        <input type="password"
                            className="input w-full"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                        <div><a className="link link-hover underline text-blue-400">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-2">Login</button>
                    </fieldset>
                    <p className="mt-2">Don’t have any account? <Link to='/register' className="underline text-blue-400">Register</Link></p>
                </form>
                <SoicalLogin></SoicalLogin>
            </div>
        </div>
    );
};

export default Login;