/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Comments.css";
import SingleComment from "./SingleComment";
// import { comments } from "../../../../data";

const Comments = ({ postComments, handlePostComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleFormSubmit = () => {};

  return (
    <div className="post__comments">
      {/* if comment length > 3 only show 3 comments and give button to show all */}
      {/* {postComments.length > 2 ? (
        <button className="show_all">view more </button>
      ) : null} */}
      {postComments.map((comment) => {
        return <SingleComment key={comment.id} comment={comment} />;
      })}

      <form className="add__comment" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="comment"
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="submit__input"
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

{
  /* <p className={`read-more ${showWords ? "show" : ""}`}>
        {postData.description}
      </p>
      <button onClick={() => setShowWords(!showWords)}>
        {showWords ? "more" : "less"}
      </button>
      {postComments.length >= 1 ? (
        <div className="some-comment">
          {/* <InputComment
            lime={
              comment[comment.length - 1].user &&
              comment[comment.length - 1].user
            }
            title={comment[comment.length - 1].user.username}
            desc={comment[comment.length - 1].content}
            time={
              <ReactTimeAgo
                date={comment[comment.length - 1].createdAt}
                locale="en-US"
              /> */
}
{
  /* }
          /> */
}
//   </div>
// ) : (
//   <p>Be the first to comment</p>
// )}
// <button
//   onClick={() => {
//     setSeeComments(!seeComments);
//   }}
// >
//   view and add comments
// </button> */}
