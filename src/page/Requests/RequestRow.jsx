import PropTypes from "prop-types";
// import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  MdDeleteForever,
  MdOutlinePendingActions,
  MdVerified,
} from "react-icons/md";
// eslint-disable-next-line react/prop-types
const RequestRow = ({ book, handleStatus, handleCancelRequest }) => {
  // const axiosSecure = useAxiosSecureHook();
  const { learnerEmail, learnerName, learnerPic, status, _id, verification } =
    book;

  return (
    <tr className="border-b-2  border-blue-100 p-8 m-8">
      <td>
        <div className="flex items-center gap-3">
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
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={learnerPic} alt={learnerName} />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-xl">{learnerName}</div>
        <div className="text-lg">{learnerEmail}</div>
      </td>
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
          <button className="btn  btn-accent text-white">
            Payment Received
          </button>
        )}
        {status === "payment sent" && (
          <button className="btn  btn-secondary text-white">
            Payment Sent
          </button>
        )}
        {status === "course complete" && (
          <button className="text-5xl text-green-800  border-2 text-center rounded-lg  border-slate-400 ">
            <IoCheckmarkCircleOutline />
          </button>
        )}
      </th>

      <th className="flex gap-5 justify-start text-lg">
        {/* mentor acceptiong learner request */}
        <button
          onClick={() => handleStatus(_id, status, "accepted")}
          className="btn btn-success text-white"
          disabled={
            status === "rejected" ||
            status === "course complete" ||
            status === "payment received" ||
            status === "payment sent"
          }
        >
          Accept
        </button>
        {/* mentor cash received button */}
        <button
          disabled={status === "rejected" || status !== "payment sent"}
          onClick={() => handleStatus(_id, status, "payment received")}
          className="btn btn-active btn-accent text-white"
        >
          Payment Received
        </button>
        {/* reject button */}
        <button
          disabled={
            status === "accepted" ||
            status === "payment received" ||
            status === "course complete" ||
            status === "payment sent"
          }
          onClick={() => handleStatus(_id, status, "rejected")}
          className="btn btn-error text-white"
        >
          Reject
        </button>
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
      </th>
    </tr>
  );
};

RequestRow.propTypes = {
  book: PropTypes.object,
};

export default RequestRow;
