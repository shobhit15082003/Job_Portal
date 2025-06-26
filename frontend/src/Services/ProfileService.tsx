
import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";



// const getProfile=async(id:any)=>{
//     return axiosInstance.get(`/profiles/get/${id}`)
//     .then(res=>{
        
//         console.log("in profile service");
//         console.log(id);
//         console.log(res.data);
//        return res.data})
//     .catch(error=>{
//         console.log("Profile service mai error");
//         throw error;
//     });
// }

const getProfile = async (id: any) => {
    try {
        const response = await axiosInstance.get(`/profiles/get/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const updateProfile=async(profile:any)=>{
    return axiosInstance.put(`/profiles/update`,profile)
    .then(res=>{
       return res.data
    })
    .catch(error=>{
        throw error;
    });
}

const getAllProfile = async()=>{
    return axiosInstance.get(`/profiles/getAll`)
    .then(result=>result.data)
    .catch(error=>{throw error});
}

export {getProfile,updateProfile,getAllProfile};
