import Header from "../components/profile/Header";
import Photos from "../components/profile/Photos";

const profilePage = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <Photos />
    </div>
  );
};

export default profilePage;
