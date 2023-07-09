/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";

const SuggestionCard = ({ user }) => {
  const { username } = user;
  return (
    <div className="suggestions__username">
      <div className="username__left">
        <span className="avatar">
          <Avatar>{username ? username.charAt(0).toUpperCase() : "A"}</Avatar>
        </span>
        <div className="username__info">
          <span className="username">{username}</span>
          <span className="relation">New to Instagram</span>
        </div>
      </div>
      <button className="follow__button">Follow</button>
    </div>
  );
};

export default SuggestionCard;
