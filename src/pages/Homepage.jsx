import "./Homepage.css";
import Sidenav from "../components/navigation/Sidenav";
import Timeline from "../components/timeline/Timeline";

const Homepage = ({ signOut, user }) => {
  return (
    <div className="homepage">
      <div className="homepage__nav">
        <Sidenav signOut={signOut} user={user} />
      </div>
      <div className="homepage__timeline">
        <Timeline />
      </div>
    </div>
  );
};

export default Homepage;
