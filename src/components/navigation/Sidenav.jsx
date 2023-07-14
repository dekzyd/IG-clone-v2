/* eslint-disable react/prop-types */
import { Auth, API, Storage, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";

import SuggestionCard from "../timeline/suggestions/SuggestionCard";

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
import ClearRounded from "@mui/icons-material/ClearRounded";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Sidenav = ({ signOut }) => {
  const [user, setUser] = useState("");
  const [userPix, setUserPix] = useState("");
  const [searchContainer, setSearchContainer] = useState(false);
  const [Results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await Auth.currentAuthenticatedUser();
        const usersList = await API.graphql(graphqlOperation(listUsers));
        const currentUser = usersList.data.listUsers.items.filter(
          (item) => item.uniqueId === userDetails.attributes.sub
        );

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

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const users = await API.graphql(graphqlOperation(listUsers));
      const searchedUsersArray = users.data.listUsers.items.filter(
        (each_user) => {
          return each_user.username.toUpperCase() === searchValue.toUpperCase();
        }
      );
      setResults(searchedUsersArray);
    } catch (error) {
      toast.error("Error searching for user");
    }
    setSearchValue("");
  };

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
        <button
          className="sidenav__button"
          onClick={() => {
            setSearchContainer(!searchContainer);
          }}
        >
          <SearchIcon />
          <span>Search</span>
        </button>
        {searchContainer && (
          <div className="border-2 text-center relative ml-3 pb-2">
            <div className="">
              <h3 className="my-4">Search</h3>
              <form onSubmit={searchUser}>
                <input
                  className="outline-indigo-500 border-2 pl-2 mb-4"
                  type="text"
                  placeholder="search user"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="ml-2 text-gray-400 hover:text-indigo-500"
                >
                  <SearchIcon />
                </button>
              </form>
              <ClearRounded
                className="absolute right-2 top-2 cursor-pointer hover:text-red-500"
                onClick={() => {
                  setSearchContainer(!searchContainer);
                  setSearchValue("");
                  setResults([]);
                }}
              />
            </div>
            <div>
              <span className="">Search Results</span>
              <div className="ml-3">
                {Results.length &&
                  Results.map((each_result) => {
                    return (
                      <SuggestionCard
                        key={each_result.id}
                        user={each_result}
                        className="mb-1"
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
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

      {/* <div className="sidenav__more">
        <button className="sidenav__button">
          <MenuIcon />
          <span>More</span>
        </button>
      </div> */}
    </div>
  );
};

export default Sidenav;
