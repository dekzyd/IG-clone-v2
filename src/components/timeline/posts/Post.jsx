import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar } from "@mui/material";
import "./Post.css";

// add comment section

const Post = ({ post }) => {
  const { user, postImage, likes, timeStamp } = post;
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Avatar className="avatar">R</Avatar>
          {user} . <span>{timeStamp}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__image">
        <img src={postImage} alt="post" />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
            <FavoriteBorderIcon className="postIcon" />
            <ChatBubbleOutlineIcon className="postIcon" />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        Liked by {likes} people.
      </div>
    </div>
  );
};

export default Post;
