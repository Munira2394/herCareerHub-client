import { useEffect, useState } from "react";
import useAuthContextHook from "../../hook/useAuthContextHook";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import Swal from "sweetalert2";
import Blog from "../../components/Blog/Blog";
const Blogs = () => {
  const { user } = useAuthContextHook();
  console.log(user, "blog user");
  const axiosSecure = useAxiosSecureHook();
  const [blogs, setBlogs] = useState([]);

  const handleBlogSubmit = (e) => {
    e.preventDefault();

    const blogTitle = e.target.blogTitle.value;
    const blogImage = e.target.blogImage.value;
    const blogContent = e.target.blogContent.value;

    const blog = {
      blogTitle,
      blogImage,
      blogContent,
      writerName: user?.displayName,
      writerPhoto: user?.photoURL,
    };
    console.log(blog, "blogs er blog");
    axiosSecure.post("/blogs", blog).then((res) => {
      console.log(res.data);

      Swal.fire({
        title: "Sweet!",
        text: "Your blog is posted",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });

      console.log(setBlogs, "set blogs");
    });
  };

  useEffect(() => {
    axiosSecure.get("/blogs").then((res) => {
      // console.log(res.data, "blog get");
      setBlogs(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="">
      {user?.role === "mentor" && (
        <div>
          <h1 className="text-3xl">Share your thoughts...</h1>
          <form onSubmit={handleBlogSubmit}>
            <div className="form-control">
              <label className="block "></label>

              <input
                name="blogTitle"
                placeholder="Title of your blog"
                className="block h-14 px-4 py-2.5 mt-2 w-[90%] mx-auto rounded-lg border  "
                required
              ></input>
            </div>
            <div className="form-control">
              <label className="block "></label>

              <input
                name="blogImage"
                placeholder="Image URL for your blog"
                className="block px-4 h-11 py-2.5 mt-2 w-[90%] mx-auto rounded-lg border  "
              ></input>
            </div>
            <div className="form-control">
              <label className="block "></label>

              <textarea
                name="blogContent"
                placeholder="Start writing ..."
                className="block  mt-2 w-[90%] mx-auto placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-36 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                required
              ></textarea>
            </div>
            <div className="form-control items-center">
              <button type="submit" className="btn w-28 btn-primary mt-5">
                Post Blog
              </button>
            </div>
          </form>
        </div>
      )}
      <h1 className="text-3xl font bold text-center mt-10">
        Available Blogs:{blogs.length}
      </h1>
      <div className="mx-auto">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog}></Blog>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
