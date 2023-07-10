/* eslint-disable react/prop-types */
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar } from "@mui/material";
import "./Post.css";
import Comments from "./comments/Comments";

// add comment section

const Post = ({ data, user }) => {
  // console.log(data);

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Avatar className="avatar">R</Avatar>
          {/* {user} . <span>{timeStamp}</span> */}
          sammy . <span>12hrs</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__image">
        <img
          src="https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="post"
        />
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
        <p className="likes">245 likes</p>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
