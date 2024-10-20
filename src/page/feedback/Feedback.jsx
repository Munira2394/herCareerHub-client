import Swal from "sweetalert2";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const { user } = useAuthContextHook();
  const axiosSecure = useAxiosSecureHook();
  const navigate = useNavigate();
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("feedback", user.email, user.displayName);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const feedback = form.get("feedback");
    console.log(
      "email,feedback",
      email,
      feedback,
      user.displayName,
      user.photoURL
    );

    const feedbackData = {
      email,
      feedback,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    axiosSecure.post("/feedback", feedbackData).then((res) => {
      //   console.log("feedback response", res.data);
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your feedback is posted",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="hero ">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Share your feedback</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleFeedbackSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                defaultValue={user.email}
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text"></span>
              </label>
              <input
                type="text"
                name="feedback"
                placeholder="Share your experience"
                className="input input-bordered h-28 w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
