import axios, { InternalAxiosRequestConfig } from "axios";
import { error } from "console";

const axiosInstance=axios.create({
    baseURL:'http://localhost:8080'
});
  

// axiosInstance.interceptors.request.use(
//     (config:InternalAxiosRequestConfig)=>{
//         const token=localStorage.getItem('token');
//         if(token){
//             config.headers.Authorization=`Bearer ${token}`;
//         }
//         console.log("hello I am inside axiosInterceptor");
//         console.log(config);
//         return config;
//     },
//     (error)=>{
//         return Promise.reject(error);
//     }
// )
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
       
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("⚠️ No token found in localStorage");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const setupResponseInterceptor=(navigate:any)=>{
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },
        (error)=>{
            if(error.response?.status==401){
                navigate('/login');
            }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;