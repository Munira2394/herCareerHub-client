import Swal from "sweetalert2";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MentorProfile = () => {
  const { user, setUser, setLoading, loading } = useAuthContextHook();
  const axiosSecure = useAxiosSecureHook();
  useEffect(() => {
    if (user) {
      axiosSecure.get(`user/${user.email}`).then((res) => {
        console.log("profile theke get response", res.data);
        setUser(res.data);
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, axiosSecure, setLoading, setUser]);
  if (loading) {
    return <div>LOADING ....</div>;
  }

  if (!user) {
    return <div>Find user</div>;
  }

  const {
    name,
    photoURL,
    phone,
    graduation,
    fees,
    mentoringSubject,
    subject,
    courseDetails,
    work,
    email,
  } = user;

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const photoURL = form.get("photoURL");
    const phone = form.get("phone");
    const graduation = form.get("graduation");
    const subject = form.get("subject");
    const work = form.get("work");
    const mentoringSubject = form.get("mentoringSubject");
    const fees = form.get("fees");
    const courseDetails = form.get("courseDetails");
    const mentorUpdate = {
      name,
      email,
      photoURL,
      phone,
      graduation,
      subject,
      work,
      mentoringSubject,
      fees,
      courseDetails,
    };
    console.log("after update", mentorUpdate);

    axiosSecure.put(`/users/${user._id}`, mentorUpdate).then((res) => {
      console.log("update user", res.data);

      if (res.data.modifiedCount > 0) {
        setUser((prevMentor) => ({ ...prevMentor, ...mentorUpdate }));
        let timerInterval;
        Swal.fire({
          title: "Profile Updated!",
          // html: "I will close in <b></b> milliseconds.",
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
    <div>
      <div className="hero ">
        <div className="hero-content  w-full h-full ">
          <div className="card w-full bg-blue-100 max-w-7xl shadow-2xl ">
            <div className="flex">
              <p className="flex-1"></p>
              <h1 className="text-3xl mt-3 flex-1 font-bold">{name}</h1>
              <div className="flex-1 text-right mr-8 mt-6">
                <Link
                  to={"/createGroup"}
                  className="bg-blue-600 rounded-lg text-white px-4 py-2"
                >
                  Share Resource
                </Link>
              </div>
            </div>
            <form className="card-body" onSubmit={handleUpdateProfile}>
              <div className="flex gap-2">
                <div className="form-control flex-1">
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
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={photoURL}
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
                    defaultValue={email}
                    className="input input-bordered "
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
                    defaultValue={phone}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Graduation</span>
                  </label>
                  <input
                    type="text"
                    name="graduation"
                    defaultValue={graduation}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Subject of expertise</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    defaultValue={subject}
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
                    defaultValue={work}
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
                    defaultValue={mentoringSubject}
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
                    defaultValue={fees}
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
                  defaultValue={courseDetails}
                  className="textarea textarea-primary h-24"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-wide mx-auto bg-blue-50 border-blue-600 text-blue-800"
                >
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
