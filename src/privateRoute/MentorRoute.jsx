import { Navigate } from "react-router-dom";
import useAuthContextHook from "../hook/useAuthContextHook";
import PropTypes from "prop-types";

const MentorRoute = ({ children }) => {
  const { loading, user } = useAuthContextHook();
  console.log(loading, "from route");

  if (loading) return <h1>Loading</h1>;
  if (user.role !== "mentor") {
    <Navigate to="/"></Navigate>;
  }

  return children;
};
MentorRoute.propTypes = {
  children: PropTypes.node,
};
export default MentorRoute;
