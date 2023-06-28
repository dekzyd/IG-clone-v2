import { Avatar } from "@mui/material";

const SuggestionCard = () => {
  return (
    <div className="suggestions__username">
      <div className="username__left">
        <span className="avatar">
          <Avatar>R</Avatar>
        </span>
        <div className="username__info">
          <span className="username">_Barl.len</span>
          <span className="relation">New to Instagram</span>
        </div>
      </div>
      <button className="follow__button">Follow</button>
    </div>
  );
};

export default SuggestionCard;
