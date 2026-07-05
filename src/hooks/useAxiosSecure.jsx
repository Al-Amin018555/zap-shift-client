import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;

        })

        //response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error.status)
            const statusCode = error.response?.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            }

            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [user, logOut, navigate])

    return axiosSecure;
}

export default useAxiosSecure;