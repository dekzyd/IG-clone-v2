/* eslint-disable react/prop-types */
import "./SingleComment.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SingleComment = ({ comment }) => {
  const { user, content } = comment;
  return (
    <div className="single__comment">
      <p className="comment__item">
        <span className="commentor">{user.username}</span>
        <span className="comment">{content}</span>
      </p>
      <FavoriteBorderIcon fontSize="15px" className="like__comment" />
    </div>
  );
};

export default SingleComment;
