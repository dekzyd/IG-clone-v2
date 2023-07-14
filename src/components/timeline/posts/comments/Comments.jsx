/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Comments.css";
import SingleComment from "./SingleComment";
import InputEmoji from "react-input-emoji";

const Comments = ({ postComments, handlePostComment, inputRef }) => {
  // sort comments in ascending order
  postComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleFormSubmit = () => {};

  return (
    <div className="post__comments">
      {/* if comment length > 3 only show 3 comments and give button to show all */}
      {postComments.length > 3 ? (
        <button
          className="show_all"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          view {showAll ? "less..." : "more..."}{" "}
        </button>
      ) : null}

      {showAll
        ? postComments.map((comment) => {
            return <SingleComment key={comment.id} comment={comment} />;
          })
        : postComments.slice(0, 3).map((comment) => {
            return <SingleComment key={comment.id} comment={comment} />;
          })}

      <form className="add__comment" onSubmit={handleFormSubmit}>
        <InputEmoji
          value={newComment}
          name="comment"
          id="comment"
          ref={inputRef}
          onChange={(value) => setNewComment(value)}
          cleanOnEnter
          placeholder="Add comment ..."
        />
        <button
          type="button"
          className="submit__comment"
          onClick={() => {
            handlePostComment(newComment, setNewComment);
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
