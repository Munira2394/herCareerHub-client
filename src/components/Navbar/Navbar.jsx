import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { PiDiamondsFourDuotone } from "react-icons/pi";
// import useMentorUserHook from "../../hook/useMentorUserHook";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleUserProfile = () => {
    if (user.role === "mentor") {
      console.log("navbar theke mentor", user);
      navigate("/mentorprofile");
    } else if (user.role === "learner") {
      console.log("navbar theke learner", user);
      navigate("/learnerprofile");
    } else if (user.role === "admin") {
      navigate("/adminprofile");
    }
  };
  // const mentor = useMentorUserHook(user._id);
  // console.log("navbar theke mentor ber kori", mentor);
  // console.log("navbar user", user.email);
  const handleLogOut = () => {
    signOutUser()
      .then((result) => {
        console.log("log out", result);
        navigate("/logIn");
      })
      .catch((error) => console.error(error.message));
  };

  const navLink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/mentors">All Mentors</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/feedbackShow"> Feedbacks</NavLink>
        </li>
      )}
      {/* grp */}
      {user && (
        <li>
          <NavLink to="/groups">Resources</NavLink>
        </li>
      )}
      {/* learner sent request */}
      {user?.role === "learner" && (
        <li>
          <NavLink to="/mymentors">My Mentors</NavLink>
        </li>
      )}
      {/* Mentor available request */}
      {user?.role === "mentor" && (
        <li>
          <NavLink to="/requests">My Requests</NavLink>
        </li>
      )}
      {/* all accounts waiting for approval */}
      {user?.role === "admin" && (
        <li>
          <NavLink to="/adminverification">Verify Accounts</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-blue-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            {" "}
            <PiDiamondsFourDuotone className="text5xl"></PiDiamondsFourDuotone>
            HerCareerHub
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex  items-center justify-center">
              <button onClick={handleUserProfile} className="">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-16 mr-3 rounded-full ring ring-offset-2 ">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
              </button>
              <NavLink onClick={handleLogOut} className="btn btn-neutral">
                Log out
              </NavLink>
            </div>
          ) : (
            <NavLink to="/logIn" className="btn btn-neutral">
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
