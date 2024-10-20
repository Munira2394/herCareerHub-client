import AboutUs from "../../components/AboutUs/AboutUs";
import Banner from "../../components/Banner/Banner";
import OurMentors from "../../components/OurMentors/OurMentors";
// import Mentors from "../Mentors/Mentors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurMentors></OurMentors>
      {/* <Mentors></Mentors> */}
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
