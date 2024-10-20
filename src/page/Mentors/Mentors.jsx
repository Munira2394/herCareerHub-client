// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";

import { useEffect, useState } from "react";
import OurMentor from "../../components/OurMentor/OurMentor";
// import useMentorHook from "../../hook/useMentorHook";

const Mentors = () => {
  // const mentors = useMentorHook();
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

  return (
    <div className="bg-blue-50">
      <h1 className="text-5xl font bold text-center mt-7 py-4">Our Mentors</h1>
      <section className="card-body">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 bottom-3">
          {mentors.map((mentor, idx) => (
            <OurMentor key={idx} mentor={mentor}></OurMentor>
          ))}
        </div>
      </section>
    </div>
    // mentors.map((mentor) => (
    //   <OurMentor
    //     key={mentor._id}
    //     mentor={mentor}
    //     setMentors={setMentors}
    //   ></OurMentor>
    // ))
  );
};

export default Mentors;
