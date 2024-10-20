import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./Main/Main.jsx";
import Home from "./page/Home/Home.jsx";
import Blogs from "./page/Blogs/Blogs.jsx";
import Mentors from "./page/Mentors/Mentors.jsx";
import OurMentorDetail from "./page/OurMentorDetail/OurMentorDetail.jsx";
import LogIn from "./page/LogIn/LogIn.jsx";
import SignUp from "./page/SignUp/SignUp.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import MentorSignup from "./page/MentorSignup/MentorSignup.jsx";
import MyMentors from "./page/MyMentors/MyMentors.jsx";

import Requests from "./page/Requests/Requests.jsx";
import MentorProfile from "./page/UserProfile/MentorProfile.jsx";
import LearnerProfile from "./page/UserProfile/LearnerProfile.jsx";
import MentorRoute from "./privateRoute/MentorRoute.jsx";
import LearnerRoute from "./privateRoute/LearnerRoute.jsx";
import BlogContent from "./components/Blog/BlogContent.jsx";
import AdminProfile from "./page/UserProfile/AdminProfile.jsx";
import AdminVerification from "./page/AdminVerification/AdminVerification.jsx";
import VerifyProfile from "./page/AdminVerification/VerifyProfile.jsx";
import Groups from "./page/groups/Groups.jsx";
import CreateGroup from "./page/groups/CreateGroup.jsx";
import Feedback from "./page/feedback/Feedback.jsx";
import FeedbackShow from "./page/feedback/FeedbackShow.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/mentorsignup",
        element: <MentorSignup />,
      },

      {
        path: "/mentorprofile",
        element: <MentorProfile />,
      },
      {
        path: "/createGroup",
        element: <CreateGroup />,
      },
      {
        path: "/learnerprofile",
        element: <LearnerProfile />,
      },
      {
        path: "/adminprofile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/groups",
        element: (
          <PrivateRoute>
            {" "}
            <Groups />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blogs/${params.id}`),
        element: (
          <PrivateRoute>
            <BlogContent />
          </PrivateRoute>
        ),
      },

      {
        path: "/mentors",
        // loader: () => fetch("http://localhost:5000/users"),
        element: <Mentors />,
      },
      {
        path: "/ourMentorDetail/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        element: (
          <PrivateRoute>
            <OurMentorDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/feedbackShow",
        element: (
          <PrivateRoute>
            {" "}
            <FeedbackShow />
          </PrivateRoute>
        ),
      },

      {
        path: "/requests",
        element: (
          <MentorRoute>
            <Requests />
          </MentorRoute>
        ),
      },
      {
        path: "/mymentors",
        element: (
          <LearnerRoute>
            <MyMentors />
          </LearnerRoute>
        ),
      },
      {
        path: "/adminverification",
        element: (
          <PrivateRoute>
            <AdminVerification />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/profileVerification/:id",
    element: <VerifyProfile></VerifyProfile>,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-7xl mx-auto bg-blue-50">
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </div>
);
