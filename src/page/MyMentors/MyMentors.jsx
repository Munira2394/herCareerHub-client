import { useEffect, useState } from "react";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import MyMentorsRow from "./MyMentorsRow";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyMentors = () => {
  const { user } = useAuthContextHook();
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecureHook();
  const navigate = useNavigate();

  const url = `/bookings?learnerEmail=${user.email}`;

  useEffect(() => {
    axiosSecure
      .get(url)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => console.log("learner req error", error));
  }, [url, axiosSecure]);
  const handleStatus = (id, prevStatus, status) => {
    console.log("id,prevStatus,statusUpdate", id, prevStatus, status);

    if (prevStatus === status) {
      return Swal.fire({
        // title: "The Internet?",
        text: "Unable to perform this operation",
        icon: "error",
      });
    }
    axiosSecure.patch(`/updateRequest/${id}`, { status }).then((res) => {
      console.log("response of status", res.data);
      if (res.data.modifiedCount > 0) {
        const updatedBooking = bookings.map((book) =>
          book._id === id ? { ...book, status: status } : book
        );

        setBookings(updatedBooking);
      }
    });
  };

  const handleCancelRequest = (id) => {
    console.log("mentor id delete er jnno", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remainingBookings = bookings.filter(
              (booking) => booking._id !== id
            );
            setBookings(remainingBookings);

            Swal.fire({
              title: "Deleted!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleFeedback = () => {
    console.log(user.email, "feedback");
    navigate("/feedback");
  };

  return (
    <div>
      <div className="space-y-7 min-h-[calc(100vh-292px)]">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl text-black">Name</th>
                <th className="text-xl text-black">Subject</th>
                <th className="text-xl text-black">Fee</th>
                <th className="text-xl text-black">Status</th>
                <th className="text-xl text-black">Mentor Information</th>
                <th className="text-xl text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((book) => (
                <MyMentorsRow
                  key={book._id}
                  book={book}
                  handleCancelRequest={handleCancelRequest}
                  handleStatus={handleStatus}
                  handleFeedback={handleFeedback}
                ></MyMentorsRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyMentors;
