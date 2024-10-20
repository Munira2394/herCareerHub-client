import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const { _id, blogTitle, blogImage, writerName, writerPhoto } = blog;
  console.log(writerName, "blog writerName");

  return (
    <div className=" max-w-5xl mx-auto border border-l-2 rounded-xl m-10 p-10 shadow-2xl ">
      <div className=" ">
        <div className="">
          <div className="text-left">
            <img
              className="object-cover object-center w-[90%] mx-auto h-80 xl:h-[28rem] rounded-xl"
              src={blogImage}
              alt=""
            />

            <div>
              <Link
                to={`/blogs/${_id}`}
                className="mt-6 text-lg ml-12 text-blue-500 btn btn-outline hover:bg-blue-900 hover:text-white"
              >
                Read the full blog
              </Link>

              <h1 className="max-w-lg pl-12 mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                {blogTitle}
              </h1>

              <div className="flex items-center mt-6">
                <div className="pl-12">
                  {" "}
                  <img
                    className="object-cover  object-center w-16 h-16 rounded-full"
                    src={writerPhoto}
                    alt=""
                  />
                </div>

                <div className="mx-4">
                  <h1 className="text-lg  text-gray-700 dark:text-gray-200">
                    {writerName}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
