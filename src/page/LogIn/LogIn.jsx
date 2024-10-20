import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "./image/womenWorking.jpg";

import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { PiDiamondsFourDuotone } from "react-icons/pi";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const LogIn = () => {
  const { signInUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecureHook();
  const location = useLocation();
  console.log("log in", location);
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log("log in user", result.user);
        axiosSecure.post("/jwt", { email: result?.user?.email }).then((res) => {
          console.log("jwt data", res.data);
          return axiosSecure.get(`/user/${email}`);
        });
        Swal.fire("You are logged in!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="hero ">
        <div
          className="hero-content w-full h-full flex-col lg:flex-row"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        >
          <div className="text-center text-black relative lg:text-left">
            <img src={loginImage} className=" w-full" alt="" />
            <div className=" w-full absolute top-0 bg-gradient-to-r from-[#151515]    to-[rgba(21,21,21,0)] text-white h-full">
              {" "}
              <h1 className="text-5xl flex font-bold mt-[200px] ml-14 ">
                <PiDiamondsFourDuotone className="text5xl mr-3"></PiDiamondsFourDuotone>{" "}
                HerCareerHub
              </h1>
              <p className="py-6 text-2xl ml-14 ">
                Join us for a guided mentorship
              </p>
            </div>
          </div>
          <div className="card  w-2/3  bg-blue-100 shadow-2xl ">
            <h1 className="text-3xl mt-3 font-bold">Log in</h1>
            <form className="card-body" onSubmit={handleLogIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6 mx-auto">
                <button className="btn btn-wide bg-blue-50 border-blue-600 text-blue-800 mb-4">
                  Login
                </button>
              </div>
            </form>
            <div className="text-center pb-6">
              Do not have an account?
              <Link className="font-bold underline text-blue-800" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
