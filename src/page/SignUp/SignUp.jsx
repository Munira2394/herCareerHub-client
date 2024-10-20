import { Link, useNavigate } from "react-router-dom";
import loginImage from "../LogIn/image/womenWorking.jpg";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";
import { PiDiamondsFourDuotone } from "react-icons/pi";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const SignUp = () => {
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecureHook();
  const role = "learner";
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");
    const photoURL = form.get("photoURL");
    const phone = form.get("phone");
    const nid = form.get("nid");

    const userSignup = {
      name,
      photoURL,
      email,
      phone,
      nid,
      role,
      verification: "pending",
      certificate: null,
      graduation: null,
      subject: null,
      work: null,
      mentoringSubject: null,
      fees: null,
      courseDetails: null,
    };

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        updateUserProfile(name, photoURL).then(() => {
          setUser({ ...result?.user, displayName: name, photoURL: photoURL });
        });
        // jwt
        axiosSecure.post("/jwt", { email: result?.user?.email }).then((res) => {
          console.log("jwt data", res.data);
        });

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userSignup),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/");
            Swal.fire("You have signed up");
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="">
      <div className="hero ">
        <div
          className="hero-content   w-full h-full flex-col lg:flex-row"
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="text-center relative h-full w-full rounded-lg text-black  lg:text-left">
            <img src={loginImage} className="w-full h-full" alt="" />
            <div className=" h-full w-full absolute top-0 bg-gradient-to-r from-[#151515]  to-[rgba(21,21,21,0)] text-white ">
              <h1 className="text-5xl flex font-bold mt-[350px] ml-11  ">
                <PiDiamondsFourDuotone className="text5xl"></PiDiamondsFourDuotone>{" "}
                HerCareerHub
              </h1>

              <p className="py-6 text-2xl ml-11 ">
                Join us for a guided mentorship
              </p>
              <div className=" ml-11 ">
                <FaGoogle className="btn btn-circle p-2 mr-4"></FaGoogle>
                <FaFacebookF className="btn btn-circle p-2 mr-4"></FaFacebookF>
                <FaInstagram className="btn btn-circle p-2 mr-4"></FaInstagram>
              </div>
            </div>
          </div>
          <div className="card w-2/3  bg-blue-100 shadow-2xl ">
            <h1 className="text-3xl mt-3 font-bold">Sign up</h1>
            <form className="card-body" onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your photo URL"
                  className="input input-bordered"
                  name="photoURL"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Phone number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{11}"
                  placeholder="Enter your phone number"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">NID or Passport or Work ID</span>
                </label>
                <input
                  type="text"
                  name="nid"
                  placeholder="  Please provide Valid NID or Passport Link or Work ID"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-wide mx-auto bg-blue-50 border-blue-600 text-blue-800">
                  Sign up
                </button>
              </div>
            </form>
            <Link
              to="/mentorsignup"
              className="btn btn-wide mx-auto bg-blue-50 border-blue-600 text-blue-800"
            >
              Sign up as <span className="text-blue-600 font-bold">Mentor</span>
            </Link>
            <div className="text-center py-6">
              Have an account?
              <Link className="font-bold underline text-blue-800" to="/logIn">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
