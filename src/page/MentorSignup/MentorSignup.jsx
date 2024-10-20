import { Link, useNavigate } from "react-router-dom";
// import { FaGoogle } from "react-icons/fa6";
// import { FaFacebookF } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
import loginImage from "../../page/LogIn/image/womenWorking.jpg";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { PiDiamondsFourDuotone } from "react-icons/pi";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const MentorSignup = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecureHook();
  const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
  const role = "mentor";
  const handleMentorSignUp = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const photoURL = form.get("photoURL");
    const email = form.get("email");
    const password = form.get("password");
    const phone = form.get("phone");
    const graduation = form.get("graduation");
    const subject = form.get("subject");
    const work = form.get("work");
    const mentoringSubject = form.get("mentoringSubject");
    const fees = Number(form.get("fees"));
    const courseDetails = form.get("courseDetails");
    const nid = form.get("nid");
    const certifcate = form.get("certifcate");
    const mentor = {
      name,
      photoURL,
      email,
      phone,
      graduation,
      subject,
      work,
      mentoringSubject,
      fees,
      courseDetails,
      nid,
      certifcate,
      role,
      verification: "pending",
    };
    console.log("mentor signup", mentor);

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
          body: JSON.stringify(mentor),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("mentor signup", data);
            navigate("/");
            Swal.fire("You have signed up");
          });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="hero ">
        <div
          className="hero-content p-12 w-full h-full flex-col lg:flex-row "
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="card w-full bg-blue-100 max-w-7xl shadow-2xl ">
            <h1 className="text-4xl mt-3 font-bold flex justify-center">
              <PiDiamondsFourDuotone className="mr-2"></PiDiamondsFourDuotone>{" "}
              Her
              <span className="text-blue-700">CareerHub</span>
            </h1>
            <h1 className="text-3xl mt-3 font-bold">Join as a mentor</h1>
            <form className="card-body" onSubmit={handleMentorSignUp}>
              <div className="flex gap-2">
                <div className="form-control flex-1">
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
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your photo URL"
                    className="input input-bordered"
                    name="photoURL"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered "
                    required
                  />
                </div>
                <div className="form-control flex-1">
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
              </div>
              <div className="flex gap-2">
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
                    <span className="label-text">Graduated from</span>
                  </label>
                  <input
                    type="text"
                    name="graduation"
                    placeholder="Enter your institute name"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Graduated on</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter your subject"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Work</span>
                  </label>
                  <input
                    type="text"
                    name="work"
                    placeholder="Enter your current working status"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">
                      Subject you want to teach
                    </span>
                  </label>
                  <input
                    type="text"
                    name="mentoringSubject"
                    placeholder="Enter the subject you want to teach"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Fee</span>
                  </label>
                  <input
                    type="text"
                    name="fees"
                    placeholder="Enter your total fees "
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">
                      NID or Passport or Work ID
                    </span>
                  </label>
                  <input
                    type="text"
                    name="nid"
                    placeholder="  Please provide Valid NID or Passport Link or Work ID"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Certificate</span>
                  </label>
                  <input
                    type="text"
                    name="certifcate"
                    placeholder="   Please Provide Honors Certificate "
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Details about your subject</span>
                </label>
                <input
                  type="text"
                  name="courseDetails"
                  placeholder="Course details"
                  className="textarea textarea-primary h-24"
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
              to="/signup"
              className="btn btn-wide mx-auto bg-blue-50 border-blue-600 text-blue-800"
            >
              Sign up as{" "}
              <span className="text-blue-600 font-bold">learner</span>
            </Link>
            {/* <div className="text-center mt-3 ">
              <FaGoogle className="btn btn-circle p-2 mr-4"></FaGoogle>
              <FaFacebookF className="btn btn-circle p-2 mr-4"></FaFacebookF>
              <FaInstagram className="btn btn-circle p-2 mr-4"></FaInstagram>
            </div> */}
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

export default MentorSignup;
