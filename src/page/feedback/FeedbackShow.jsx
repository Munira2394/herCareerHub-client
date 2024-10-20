import { useEffect, useState } from "react";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const FeedbackShow = () => {
  const axiosSecure = useAxiosSecureHook();
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axiosSecure.get("/feedback").then((res) => {
      console.log("feedback show", res.data);
      setFeedbacks(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("feedbacks", feedbacks);

  return (
    <div>
      {feedbacks.map((feedback) => (
        <div key={feedback._id} className="card m-9 lg:card-side shadow-xl">
          <figure>
            <img
              src={feedback.photoURL}
              className="w-64 h-56 rounded-2xl "
              alt={feedback.displayName}
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title">{feedback.displayName}</h2>
            <p className="card-text">{feedback.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackShow;
