import "./Comments.css";
import SingleComment from "./SingleComment";
import { comments } from "../../../../data";

const Comments = () => {
  return (
    <div className="post__comments">
      {/* if comment length > 3 only show 3 comments and give button to show all */}
      {comments.map((comment, index) => {
        return (
          <SingleComment key={`${comment.userId}-${index}`} comment={comment} />
        );
      })}
      {comments.length >= 3 ? (
        <button className="show_all">view more </button>
      ) : null}
      <form action="#" className="add__comment">
        <input
          type="text"
          name="msg"
          id="msg"
          className="submit__input"
          placeholder="Add comment ..."
        />
        <button type="submit" className="submit__comment">
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
