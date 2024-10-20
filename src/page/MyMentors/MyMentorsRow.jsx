import PropTypes from "prop-types";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import { MdDeleteForever } from "react-icons/md";
const MyMentorsRow = ({
  book,
  handleCancelRequest,
  handleStatus,
  handleFeedback,
}) => {
  const {
    _id,
    name,
    fees,
    mentorEmail,
    phone,
    mentoringSubject,
    photoURL,
    status,
  } = book;
  return (
    <tr className=" border-b-2  border-blue-100 p-8 m-8">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-14 w-14">
              <img src={photoURL} alt={name} />
            </div>
          </div>
          <div className="font-bold text-xl">{name}</div>
        </div>
      </td>
      <td className="text-xl">{mentoringSubject}</td>
      <td className="text-xl">{fees} TK</td>

      <th>
        {status === "pending" && (
          <button className="btn btn-warning text-white">Pending</button>
        )}
        {status === "accepted" && (
          <button className="btn btn-success text-white">Acepted</button>
        )}
        {status === "rejected" && (
          <button className="btn btn-error text-white">Rejected</button>
        )}
        {status === "payment received" && (
          <button className="btn btn-accent text-white">
            Payment Received
          </button>
        )}
        {status === "payment sent" && (
          <button className="btn  btn-secondary text-white">
            Payment Sent
          </button>
        )}
        {status === "course complete" && (
          <button className=" text-white">
            <IoCheckmarkCircleOutline className="text-5xl text-green-800  border-2 text-center rounded-lg  border-slate-400 " />
          </button>
        )}
      </th>
      <th>
        {status === "pending" && <h1>Wait for approval</h1>}
        {status !== "pending" && status !== "rejected" && (
          <div className="text-lg font-normal">
            <h1>{mentorEmail}</h1>
            <h1>{phone}</h1>
          </div>
        )}
      </th>

      <th className=" space-y-8">
        {/* delete from database */}
        <MdDeleteForever
          disabled={
            status === "accepted" ||
            status === "payment received" ||
            status === "payment sent"
          }
          onClick={() => handleCancelRequest(_id)}
          className="text-7xl  border-2 text-center rounded-lg btn  border-slate-400 block"
        ></MdDeleteForever>
        {/* mentor k fees send */}
        <button
          disabled={
            status === "rejected" ||
            status === "payment received" ||
            status === "pending" ||
            status === "course complete"
          }
          onClick={() => handleStatus(_id, status, "payment sent")}
          className="btn btn-active block btn-accent text-white"
        >
          Send Fees
        </button>

        {/* course complete button */}
        <button
          disabled={status !== "payment received"}
          onClick={() => handleStatus(_id, status, "course complete")}
          className="btn btn-active btn-info text-white block"
        >
          Course Complete
        </button>
        {/* feedback mentor */}
        {status === "course complete" && (
          <button className="btn btn-neutral block" onClick={handleFeedback}>
            Share feedback
          </button>
        )}
      </th>
    </tr>
  );
};

MyMentorsRow.propTypes = {
  book: PropTypes.object,
  handleCancelRequest: PropTypes.func,
  handleStatus: PropTypes.func,
  handleFeedback: PropTypes.func,
};

export default MyMentorsRow;
