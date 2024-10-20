import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <span className="loading loading-bars loading-lg text-5xl text-center"></span>
    );
  }
  console.log("private location ", location.pathname);

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
