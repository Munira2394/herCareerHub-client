import { useEffect, useState } from "react";
import AdminVerificationRow from "./AdminVerificationRow";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const AdminVerification = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecureHook();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        {
          // console.log("shob mentor and learner", data);
          const userList = [];
          data.forEach((item) => {
            // console.log(item.role);
            if (item.role !== "admin") {
              userList.push(item);
            }
            setUsers(userList);
          });
        }
      });
  }, []);

  const handleVerification = (id, verification) => {
    console.log("verification ", id, verification);
    axiosSecure.patch(`/verifyUser/${id}`, { verification }).then((res) => {
      console.log("response of verification", res.data);
      if (res.data.modifiedCount > 0) {
        const verifiedUser = users.map((user) =>
          user._id === id ? { ...user, verification: verification } : user
        );

        setUsers(verifiedUser);
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl mb-8 p-5">Verify Users</h1>
      <div className="space-y-7 min-h-[calc(100vh-292px)]">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl text-black">Name</th>
                <th className="text-xl text-black">Role</th>
                <th className="text-xl text-black">See Details</th>
                <th className="text-xl text-black">Verification Status</th>
                <th className="text-xl text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <AdminVerificationRow
                  key={user._id}
                  user={user}
                  handleVerification={handleVerification}
                ></AdminVerificationRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;
