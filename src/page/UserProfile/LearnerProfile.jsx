import Swal from "sweetalert2";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import { useEffect } from "react";

const LearnerProfile = () => {
  const { user, setUser, setLoading, loading } = useAuthContextHook();

  const axiosSecure = useAxiosSecureHook();
  useEffect(() => {
    setLoading(true);
    if (user) {
      axiosSecure.get(`user/${user.email}`).then((res) => {
        console.log("profile theke get response", res.data);
        setUser(res.data);
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, axiosSecure, setLoading, setUser]);
  // }, [user?.email, axiosSecure, setLoading, setUser, user]);

  if (loading) {
    return <div>LOADING ....</div>;
  }

  if (!user) {
    return <div>Find user</div>;
  }
  const { photoURL, name, email } = user;
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");

    const name = form.get("name");
    const photoURL = form.get("photoURL");

    const learnerUpdate = { email, name, photoURL };
    console.log("learner update", learnerUpdate);

    axiosSecure.put(`/user/${user?._id}`, learnerUpdate).then((res) => {
      console.log("update user", res.data);

      if (res.data.modifiedCount > 0) {
        setUser((prevLearner) => ({ ...prevLearner, ...learnerUpdate }));
        let timerInterval;
        Swal.fire({
          title: "Profile Updated!",
          html: "I will close in <b></b> milliseconds.",
          timer: 600,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  };
  return (
    <div className="hero">
      <div className="hero-content flex ">
        <figure className="flex flex-1 justify-end">
          <img
            src={photoURL}
            className="h-1/2 w-1/2 rounded-xl shadow-2xl"
            alt=""
          />
        </figure>
        <form
          className="card-body flex flex-1 justify-start"
          onSubmit={handleUpdate}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              defaultValue={name}
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
              defaultValue={photoURL}
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
              defaultValue={email}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-wide mx-auto bg-blue-50 border-blue-600 text-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnerProfile;
