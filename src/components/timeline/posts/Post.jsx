/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar } from "@mui/material";
import "./Post.css";
import Comments from "./comments/Comments";

import { API, Storage, graphqlOperation } from "aws-amplify";
import { listComments, listLikes } from "../../../graphql/queries";

// add comments section

const Post = ({ postData, userSP }) => {
  const [postMakerPix, setPostMakerPix] = useState("");
  const [postMaker, setPostMaker] = useState("");
  const [liveUser, setLiveUser] = useState("");
  const [userO, setUserO] = useState("");
  const [postPic, setPostPic] = useState("");
  const [postComments, setPostComments] = useState("");
  const [_likes, set_Likes] = useState([]);

  // console.log(userSP[0]);

  useEffect(
    () => {
      //     setLiveUser(userSP[0]);

      const fetchPix = async () => {
        //       const user_Image = await Storage.get(userSP[0].avatar, { expires: 60 });
        const post_Image = await Storage.get(postData.image, { expires: 60 });
        //       const postOwnerpix = await Storage.get(postData.owner.avatar, {
        //         expires: 60,
        //       });
        //       setUserO(user_Image);
        setPostMaker(postData.owner);
        //       console.log(postData.owner);
        setPostPic(post_Image);
        //       setPostMakerPix(postOwnerpix);
        //       // const fetchComments = await API.graphql(graphqlOperation(listComments));
        //       // setPostComments(
        //       //   fetchComments.postData.listComments.items.filter((each_comment) => {
        //       //     return each_comment.post.id === postData.id;
        //       //   })
        //       // );
        //       // const D_Likes = await API.graphql(graphqlOperation(listLikes));
        //       // set_Likes(
        //       //   D_Likes.postData.listLikes.items.filter((each_like) => {
        //       //     return each_like.post.id === postData.id;
        //       //   })
        //       // );
      };
      fetchPix();
    },
    [
      // postData.id,
      // postData.image,
      // postData.owner,
      // userSP,
      // _likes,
      // postComments,
    ]
  );

  // const [viewComment, setViewComment] = useState(false);
  // const handleView = () => {
  //   setViewComment(true);
  // };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Link to={`profile/${postMaker.id}`}>
            {postMakerPix ? (
              <Avatar src={postMakerPix} className="avatar"></Avatar>
            ) : (
              <Avatar className="avatar">
                {postData.owner.username.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Link>
          <p>
            {postMaker.username} .{" "}
            <span>
              <ReactTimeAgo date={postData.createdAt} locale="en-US" />
            </span>
          </p>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="post__image">
        <img src={postPic} alt="post-image" />
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
        <p className="_likes">245 _likes</p>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
