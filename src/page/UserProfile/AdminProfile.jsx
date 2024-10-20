import { useEffect } from "react";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const AdminProfile = () => {
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
  if (loading) {
    return <div>LOADING ....</div>;
  }

  if (!user) {
    return <div>Find user</div>;
  }
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex ">
          <figure className="flex flex-1 justify-end">
            <img
              src={user?.photoURL}
              className="h-1/2 w-1/2 rounded-xl shadow-2xl"
              alt=""
            />
          </figure>
          <form className="card-body flex flex-1 justify-start">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.name}
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
                defaultValue={user?.photoURL}
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
                defaultValue={user?.email}
                className="input input-bordered"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
