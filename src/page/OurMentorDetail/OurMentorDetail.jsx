import { useLoaderData } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import axios from "axios";
import useAuthContextHook from "../../hook/useAuthContextHook";

const OurMentorDetail = () => {
  const mentorFromCard = useLoaderData();
  // const { user, learner, mentor } = useContext(AuthContext);
  const { user } = useAuthContextHook();
  const userEmail = user.email;
  const userPhoto = user.photoURL;
  const userName = user.displayName;
  const userRole = user.role;
  const verification = user.verification;

  console.log("j book korche taar mail", userEmail);

  console.log("details page user", user);
  const {
    name,
    photoURL,
    email,
    subject,
    work,
    phone,
    mentoringSubject,
    fees,
    courseDetails,
  } = mentorFromCard;

  const booking = {
    name,
    photoURL,
    phone,
    mentorEmail: email,
    subject,
    work,
    mentoringSubject,
    fees,
    courseDetails,
    learnerEmail: userEmail,
    learnerName: userName,
    learnerPic: userPhoto,
    status: "pending",
    verification,
  };
  console.log("mentor booking", booking);

  const handleBookNow = () => {
    // user authentication so same user cant book themselves
    // if (booking.mentorEmail === userEmail) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "not eligible to book!",
    //   });
    // }
    axios
      .post("http://localhost:5000/bookings", booking)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your request is sent and waiting for approval",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(" done booking");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="hero bg-blue-50 border-b-2 border-blue-950 p-5">
      <div className="hero-content flex-col lg:flex-row lg:justify-items-start">
        <div>
          <img src={photoURL} className="rounded-lg max-w-2xl " />

          {userRole === "mentor" && (
            <h1 className="text-center mt-4 text-3xl">
              Email :
              <span className="text-3xl font-medium text-blue-700">
                {email}
              </span>
            </h1>
          )}
        </div>

        <div className="w-2/3 text-left space-y-5">
          <h1 className="text-4xl font-bold">Mentor: {name}</h1>
          <p className="py-2 text-l font-medium">
            Work:<span className="text-xl text-blue-700">{work}</span>.
          </p>
          <p className="py-2 text-l font-medium">
            Graduated on :
            <span className="text-xl text-blue-700"> {subject}</span>
          </p>
          <p className="py-2 text-l font-medium">
            Subject:
            <span className="text-xl text-blue-700">
              {mentoringSubject}
            </span>{" "}
            Fees: <span className="text-xl text-blue-700">{fees}</span>
          </p>
          <p className="py-2 text-l font-medium">
            Course Details:{" "}
            <span className="text-xl text-blue-700">{courseDetails}</span>
          </p>

          {userRole === "learner" && (
            <button onClick={handleBookNow} className="btn btn-primary m-3">
              Add as your mentor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurMentorDetail;
