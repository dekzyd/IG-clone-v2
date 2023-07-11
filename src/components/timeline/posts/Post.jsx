/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Avatar } from "@mui/material";

import "./Post.css";
import Comments from "./comments/Comments";

import { API, Storage, graphqlOperation } from "aws-amplify";
import { listComments, listLikes } from "../../../graphql/queries";
import {
  createComment,
  createLike,
  deleteLike,
} from "../../../graphql/mutations";

// add comments section

const Post = ({ postData, user }) => {
  const [postMakerPix, setPostMakerPix] = useState("");
  const [postMaker, setPostMaker] = useState("");
  const [liveUser, setLiveUser] = useState("");
  const [userO, setUserO] = useState("");
  const [postPic, setPostPic] = useState("");
  const [postComments, setPostComments] = useState("");
  const [_liked, set_Liked] = useState(false);
  const [postLikesNum, setPostLikesNum] = useState("");

  // console.log(user[0]);
  // console.log(postData);

  useEffect(
    () => {
      setLiveUser(user[0]);
      // console.log(user[0]);

      const fetchPix = async () => {
        //       const user_Image = await Storage.get(user[0].avatar, { expires: 60 });
        const post_Image = await Storage.get(postData.image, { expires: 60 });
        //       const postOwnerpix = await Storage.get(postData.owner.avatar, {
        //         expires: 60,
        //       });
        //       setUserO(user_Image);
        setPostMaker(postData.owner);
        setPostPic(post_Image);
        //       setPostMakerPix(postOwnerpix);
        //       // const fetchComments = await API.graphql(graphqlOperation(listComments));
        //       // setPostComments(
        //       //   fetchComments.postData.listComments.items.filter((each_comment) => {
        //       //     return each_comment.post.id === postData.id;
        //       //   })
        //       // );
        const get_Likes = await API.graphql(graphqlOperation(listLikes));

        // total likes on post
        const totalPostLikes = get_Likes.data.listLikes.items.filter(
          (each_like) => {
            return each_like.post.id === postData.id;
          }
        );
        setPostLikesNum(totalPostLikes.length);
        // check if user has liked post
        const postLikedByUser = get_Likes.data.listLikes.items.filter(
          (each_like) => {
            return (
              each_like.post.id === postData.id &&
              each_like.user.id === user[0].id
            );
          }
        );

        if (postLikedByUser.length > 0) {
          set_Liked(true);
        }
      };
      fetchPix();
    },
    [
      // postData.id,
      // postData.image,
      // postData.owner,
      // user,
      // _liked,
      // postComments,
    ]
  );

  // const [viewComment, setViewComment] = useState(false);
  // const handleView = () => {
  //   setViewComment(true);
  // };

  const handlePostLike = async (set_Liked) => {
    try {
      const likesData = await API.graphql(graphqlOperation(listLikes));
      const likesArray = likesData.data.listLikes.items;
      // console.log({ likes: likesArray });
      let likedPost = false;
      let Index;
      for (let i = 0; i < likesArray.length; i++) {
        if (
          likesArray[i].post.id === postData.id &&
          likesArray[i].user.id === user[0].id
        ) {
          likedPost = true;
          Index = i;
          break;
        }
      }
      if (likedPost) {
        await API.graphql(
          graphqlOperation(deleteLike, {
            input: {
              id: likesArray[Index].id,
            },
          })
        );
        set_Liked(false);
      } else {
        await API.graphql(
          graphqlOperation(createLike, {
            input: {
              userLikesId: user[0].id,
              postLikesId: postData.id,
            },
          })
        );
        set_Liked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleText = () => {
  //   setShowText(!showText);
  // };

  const handlePostComment = async () => {
    console.log("comment on post");

    //  !inputValue
    //    ? toast("Input filed cannot be empty")
    //    : await API.graphql(
    //        graphqlOperation(createComment, {
    //          input: {
    //            content: inputValue,
    //            userCommentsId: currUser.id,
    //            postCommentsId: postData.id,
    //          },
    //        })
    //      );
    //  toast("Comment added");
    //  setInputValue("");
  };

  const handlePostShare = async () => {
    console.log("share post");

    //  try {
    //    if (navigator.share) {
    //      await navigator.share({
    //        title: `${postData.title}`,
    //        text: `${postData.description}`,
    //        url: "https://6467c48fa1ba7459514feffd--classy-beijinho-4f97d5.netlify.app/",
    //      });
    //    } else {
    //      alert("Sharing is not supported on this browser");
    //    }
    //  } catch (error) {
    //    console.log({ "Share Error": error.message });
    //  }
  };

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
            {_liked ? (
              <FavoriteIcon
                sx={{ color: "#bf1d32" }}
                onClick={() => {
                  handlePostLike(set_Liked);
                }}
                className="postIcon"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => {
                  handlePostLike(set_Liked);
                }}
                className="postIcon"
              />
            )}
            <ChatBubbleOutlineIcon
              onClick={handlePostComment}
              className="postIcon"
            />
            <TelegramIcon onClick={handlePostShare} className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon__bkmk" />
          </div>
        </div>
        <p className="_liked">245 _liked</p>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
