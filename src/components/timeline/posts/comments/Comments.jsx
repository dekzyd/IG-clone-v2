/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Comments.css";
import SingleComment from "./SingleComment";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import InputEmoji from "react-input-emoji";

const Comments = ({ postComments, handlePostComment }) => {
  const [newComment, setNewComment] = useState("");
  const [viewEmojiPlane, setViewEmojiPlane] = useState(false);
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
        {/* <input
          type="text"
          name="comment"
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="submit__input"
          placeholder="Add comment ..."
        />
        <EmojiEmotions
          onClick={() => setViewEmojiPlane(!viewEmojiPlane)}
          className="emojiIcon"
          sx={{ fontSize: 25 }}
        /> */}
        <InputEmoji
          value={newComment}
          name="comment"
          id="comment"
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
        {/* {viewEmojiPlane && (
          <div className="emojiplane">
            <EmojiPicker
              searchPlaceholder="Ara"
              emojiStyle="native"
              theme="dark"
              onEmojiClick={(e) => {
                setNewComment((prevInput) => prevInput + e.emoji);
                setViewEmojiPlane(false);
              }}
              previewConfig={{
                showPreview: true,
                defaultEmoji: "1f92a",
                defaultCaption: "Add your emoji here...",
              }}
            />
          </div>
        )} */}
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
