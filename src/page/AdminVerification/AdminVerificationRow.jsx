import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const AdminVerificationRow = ({ user, handleVerification }) => {
  const navigate = useNavigate();
  const { email, name, photoURL, role, _id, verification } = user;
  const handleSeeDetails = (id) => {
    navigate(`/profileVerification/${id}`);
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photoURL} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{email}</div>
          </div>
        </div>
      </td>
      <td>{role}</td>

      <th>
        <button
          onClick={() => handleSeeDetails(_id)}
          className="btn btn-info text-white"
        >
          {" "}
          See details
        </button>
      </th>
      <th>
        {verification === "pending" && (
          <button className="btn btn-warning text-white">Pending</button>
        )}
        {verification === "verified" && (
          <button className="btn btn-primary text-white">Verified</button>
        )}
      </th>
      <th>
        <button
          disabled={verification === "verified"}
          onClick={() => handleVerification(_id, "verified")}
          className="btn btn-primary text-white"
        >
          Verify
        </button>
      </th>
    </tr>
  );
};

AdminVerificationRow.propTypes = {
  user: PropTypes.object,
  handleVerification: PropTypes.func,
};
export default AdminVerificationRow;
