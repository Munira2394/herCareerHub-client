import { useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const VerifyProfile = () => {
  const loaderUser = useLoaderData();
  const navigate = useNavigate();

  const { name, email, nid, certifcate, phone, photoURL } = loaderUser;
  console.log(loaderUser, "loaderUser");
  const handleHome = () => {
    navigate("/");
  };
  const handleGoBack = () => {
    navigate("/adminverification");
  };
  return (
    <div>
      <div className="card card-side items-start mt-0 h-full m-5 max-w-5xl mx-auto shadow-xl">
        <figure className="p-10 pt-10 w-1/2">
          <img src={photoURL} alt={name} className="rounded-xl w-full" />
        </figure>
        <div className="card-body items-center w-1/2  text-center">
          <h2 className="card-title text-3xl">{name}</h2>
          <p className="text-2xl ">
            Email :{" "}
            <span className="font-semibold border-b-2 border-b-slate-300">
              {email}{" "}
            </span>{" "}
            Phone :{" "}
            <span className="font-semibold border-b-2 border-b-slate-300">
              {phone}
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg lg:text-xl text-left">NID:</h3>
            <img src={nid} className="w-full rounded-lg" alt="" />

            {certifcate ? (
              <>
                <h3 className="font-bold text-lg lg:text-xl text-left">
                  Certificate:
                </h3>
                <img src={certifcate}></img>
              </>
            ) : (
              ""
            )}
          </div>
          {/* <div>{role === "mentor" && <img src={certificate}></img>}</div> */}
          <div className="card-actions mt-4">
            <button onClick={handleGoBack} className="btn btn-primary">
              Go Back
            </button>
            <button onClick={handleHome} className="btn btn-primary">
              Home
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default VerifyProfile;
