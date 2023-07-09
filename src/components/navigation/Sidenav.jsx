/* eslint-disable react/prop-types */
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

const Sidenav = ({ signOut, user }) => {
  const username = user?.username;

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
          <ExploreIcon />
          <span>Explore</span>
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
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>

        <button className="sidenav__button">
          <div className="av_user">
            <Avatar src="\images\image1.jpg">
              {username ? username.charAt(0).toUpperCase() : "A"}
            </Avatar>
            <Link to={`/profile/${username}`} className="link">
              <span>{username}</span>
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
