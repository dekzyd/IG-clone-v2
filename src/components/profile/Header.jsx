/* eslint-disable react/prop-types */
import { Auth } from "aws-amplify";

const Header = ({ user }) => {
  const profileUsername = "habibi";
  const photosCount = 25;
  const followerCount = 153;
  const following_length = 2546;
  const fullName = "Abudulaye habibi";

  console.log(user);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto  mt-6 max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={` profile picture`}
          src="\images\image1.jpg"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>

          <button
            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
            type="button"
          >
            Follow
          </button>
        </div>
        <div className="container flex mt-4">
          <>
            <p className="mr-10">
              <span className="font-bold">{photosCount}</span> photos
            </p>
            <p className="mr-10">
              <span className="font-bold">{followerCount}</span>
              {` `}
              {followerCount === 1 ? `follower` : `followers`}
            </p>
            <p className="mr-10">
              <span className="font-bold">{following_length}</span> following
            </p>
          </>
        </div>
        <div className="container mt-4">
          <p className="font-medium">{fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
