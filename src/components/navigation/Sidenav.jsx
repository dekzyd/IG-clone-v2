/* eslint-disable react/prop-types */
import { Auth, API, Storage, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

import "./Sidenav.css";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

const Sidenav = ({ signOut }) => {
  const [user, setUser] = useState("");
  const [userPix, setUserPix] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await Auth.currentAuthenticatedUser();
        const usersList = await API.graphql(graphqlOperation(listUsers));
        const currentUser = usersList.data.listUsers.items.filter(
          (item) => item.uniqueId === userDetails.attributes.sub
        );
        console.log(currentUser);
        setUser(currentUser[0]);
        const userProfilePix = await Storage.get(currentUser[0].avatar, {
          expires: 60,
        });
        setUserPix(userProfilePix);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="sidenav">
      <img
        className="sidenav__logo"
        src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
        alt="instagram logo"
      />
      <div className="sidenav__buttons">
        <button className="sidenav__button">
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className="sidenav__button">
          <SearchIcon />
          <span>Search</span>
        </button>
        <button className="sidenav__button">
          <Link to="/explore">
            <ExploreIcon />
            <span>Explore</span>
          </Link>
        </button>
        <button className="sidenav__button">
          <SlideshowIcon />
          <span>Reels</span>
        </button>
        <button className="sidenav__button">
          <ChatIcon />
          <span>Messages</span>
        </button>
        <button className="sidenav__button">
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>
        <button className="sidenav__button">
          <Link to="/add_post">
            <AddCircleOutlineIcon />
            <span>Create</span>
          </Link>
        </button>

        <button className="sidenav__button">
          <div className="av_user">
            <Avatar src={userPix}>
              {user.username ? user.username.charAt(0).toUpperCase() : "A"}
            </Avatar>
            <Link to={`/profile/${user.id}`} className="link">
              <span>{user.username}</span>
            </Link>
          </div>
          <div className="logout__button" onClick={signOut}>
            Logout
          </div>
        </button>
      </div>

      <div className="sidenav__more">
        <button className="sidenav__button">
          <MenuIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
