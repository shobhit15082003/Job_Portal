
import axiosInstance from "../Interceptor/AxiosInterceptor";


const getNotifications=async(id:any)=>{
    try{
        const response=await axiosInstance.get(`/notification/get/${id}`);
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
    
}


const readNotification =async(id:any)=>{
     return axiosInstance.put(`/notification/read/${id}`)
    .then(res=>{
        return res.data})
    .catch(error=>{
        throw error;
    });
}
export {getNotifications,readNotification};
