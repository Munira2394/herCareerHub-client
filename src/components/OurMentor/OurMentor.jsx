// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions, MdVerified } from "react-icons/md";

const OurMentor = ({ mentor }) => {
  // const navigate = useNavigate();
  const { _id, name, photoURL, mentoringSubject, fees, work, verification } =
    mentor;

  //  _id,name, photoURL, email, hsc, graduation, subject, work, mentoringSubject, fees, courseDetails,

  // const handleDetails = ({ id }) => {
  //   navigate(`/ourMentorDetail/&{id}`);
  //   console.log("mentor detail clicked", id);
  // };
  return (
    <div className="card w-full h-full bg-blue-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={photoURL}
          alt={name}
          className="rounded-xl w-full h-80 object-fit"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="w-full flex justify-center ">
          <h2 className="card-title  ">{name}</h2>
          {verification === "verified" && (
            <h1 className="bg-blue-300 ml-3 p-2 rounded-3xl text-black text-base font-semibold flex">
              verified <MdVerified className="text-xl text-center pt-1" />
            </h1>
          )}
          {verification === "pending" && (
            <h1 className="bg-yellow-100 ml-3 p-2 rounded-3xl flex text-black text-xs font-semibold">
              pending
              <MdOutlinePendingActions className="text-xl text-center pt-1" />
            </h1>
          )}
        </div>
        <p className="text-pretty font-medium text-l">
          Work: <span className="text-blue-800 text-xl">{work}</span>
        </p>
        <p className="text-pretty font-medium text-l">
          {mentoringSubject} :{" "}
          <span className="text-blue-800 text-xl">{fees}TK</span>
        </p>
        <div className="card-actions">
          <Link to={`/ourMentorDetail/${_id}`} className="btn btn-primary">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};
OurMentor.propTypes = {
  mentor: PropTypes.object,
};
export default OurMentor;
