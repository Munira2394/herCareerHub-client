// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import OurMentor from "../OurMentor/OurMentor";
import { useNavigate } from "react-router-dom";
// import useMentorHook from "../../hook/useMentorHook";

const OurMentors = () => {
  const navigate = useNavigate();
  const handleShowMore = () => {
    navigate("/mentors");
  };
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        {
          // console.log("shob mentor and learner", data);
          const mentorList = [];
          data.forEach((item) => {
            // console.log(item.role);
            if (item.role === "mentor") {
              mentorList.push(item);
            }
            setMentors(mentorList);
          });
        }
      });
  }, []);
  // const mentors = useMentorHook();
  return (
    <div className="bg-blue-50">
      <h1 className="text-5xl font bold text-center mt-7 py-4">
        Meet Our Mentors
      </h1>
      <section className="card-body">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2 ">
          {mentors.slice(0, 3).map((mentor, idx) => (
            <OurMentor key={idx} mentor={mentor}></OurMentor>
          ))}
        </div>
      </section>
      {mentors.length > 3 && (
        <button onClick={handleShowMore} className="btn btn-primary mt-5">
          Show more
        </button>
      )}
    </div>
  );
};

export default OurMentors;
