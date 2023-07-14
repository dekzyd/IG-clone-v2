/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SuggestionCard = ({ user }) => {
  const { username, avatar } = user;
  const [image, setImage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const profPix = await Storage.get(avatar, { expires: 60 });
      setImage(profPix);
    };

    getImage();
  }, []);
  return (
    <div className="suggestions__username">
      <Link to={`profile/${user.id}`}>
        <div className="username__left">
          <span className="avatar">
            <Avatar src={image}>
              {username ? username.charAt(0).toUpperCase() : "A"}
            </Avatar>
          </span>
          <div className="username__info">
            <span className="username">{username}</span>
            {/* <span className="relation">New to Instagram</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SuggestionCard;
