/* eslint-disable react/prop-types */
import Comment from "postcss/lib/comment";
import "./SingleComment.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SingleComment = ({ comment }) => {
  console.log(Comment);
  // const { userId, message } = comment;
  return (
    <div className="single__comment">
      <p className="comment__item">
        {/* <span className="commentor">{userId}</span>
        <span className="comment">{message}</span> */}
      </p>
      <FavoriteBorderIcon fontSize="15px" className="like__comment" />
    </div>
  );
};

export default SingleComment;
