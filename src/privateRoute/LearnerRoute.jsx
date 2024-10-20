import { Navigate } from "react-router-dom";
import useAuthContextHook from "../hook/useAuthContextHook";
import PropTypes from "prop-types";

const LearnerRoute = ({ children }) => {
  const { loading, user } = useAuthContextHook();
  // console.log(loading, "from route");

  if (loading) return <h1>Loading</h1>;
  if (user.role !== "learner") {
    <Navigate to="/"></Navigate>;
  }

  return children;
};

LearnerRoute.propTypes = {
  children: PropTypes.node,
};

export default LearnerRoute;
