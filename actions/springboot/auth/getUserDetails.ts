import axiosInstance from "@/axios.config";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const getUserDetails = async (): Promise<any> => {
  try {
    const res = await axiosInstance.get('/auth/user');
    const user = await res.data;
    return (user as any) || null;
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    toast.error(err.message);
  }
  return null;
}

export default getUserDetails