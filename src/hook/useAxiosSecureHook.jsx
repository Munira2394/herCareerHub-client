import axios from "axios";

// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecureHook = () => {
  // const { signOutUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  // // response interceptor
  // axiosSecure.interceptors.response.use(
  //   (res) => {
  //     console.log("interceptor response", res);
  //     return res;
  //   },
  //   async (error) => {
  //     console.log("error interceptor", error.response);
  //     if (error.response === 401 || error.response === 403) {
  //       await signOutUser();
  //       navigate("/");
  //     }

  //     return Promise.reject(error);
  //   }
  // );
  return axiosSecure;
};

export default useAxiosSecureHook;
