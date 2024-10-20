import { useLoaderData } from "react-router-dom";

const BlogContent = () => {
  const loadedBlog = useLoaderData();
  const { writerPhoto, writerName, blogTitle, blogImage, blogContent } =
    loadedBlog;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className=" items-center">
        <h1 className="pl-10 font-semibold mb-5  text-3xl ">{blogTitle}</h1>
        <div className=" mb-6 mx-auto text-center  flex items-center justify-center">
          <div className="avatar">
            <div className="mask mask-circle w-10">
              <img src={writerPhoto} />
            </div>
          </div>
          <h1 className="text-lg ml-3">{writerName}</h1>
        </div>
        <img
          src={blogImage}
          className="border mb-6 rounded-lg w-[80%] h-[70%] mx-auto"
          alt=""
        />
      </div>
      <p className="text-left text-lg">{blogContent}</p>
    </div>
  );
};

export default BlogContent;
