// import { useEffect, useState } from "react";
// import useAxiosSecureHook from "../../hook/useAxiosSecureHook";

const Banner = () => {
  // const axiosSecure=useAxiosSecureHook()
  //   const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    // setSearch(searchText);
    console.log("search option", searchText);
  };

  // useEffect(()=>{
  //   axiosSecure(`/users?search=${search}`)
  //   .then(res=>)

  // },[search,axiosSecure])
  return (
    <div>
      <div
        className="hero min-h-[450px]"
        style={{
          backgroundImage: "url(https://i.ibb.co/Jqvx0MS/2148461452.jpg)",
          backgroundPosition: "center-top",
        }}
      >
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">Welcome To our website</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi
            </p>
            <div className="flex justify-center">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search here ..."
                  id=""
                  className="p-3 rounded-lg mr-3 text-black"
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Search"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
