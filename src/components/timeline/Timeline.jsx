/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Suggestions from "./suggestions/Suggestions";
import "./Timeline.css";
import Post from "./posts/Post";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { listPosts } from "../../graphql/queries";

const Timeline = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userSP, setUserSP] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await Auth.currentAuthenticatedUser();
        const usersList = await API.graphql(graphqlOperation(listUsers));
        const currentUser = usersList.data.listUsers.items.filter(
          (item) => item.uniqueId === userDetails.attributes.sub
        );

        if (currentUser.length < 1 || !usersList) {
          setUpdateProfile(true);
          toast.warning("You need to update your Profile");
        } else {
          const getPosts = await API.graphql(graphqlOperation(listPosts));
          setPosts(getPosts.data.listPosts.items);
          const sortedPosts = getPosts.data.listPosts.items.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setUserSP(sortedPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline_posts">
          {posts.map((post, index) => (
            <Post key={index} postData={post} userSP={userSP} />
          ))}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>
      {updateProfile && <Navigate to="/settings" />}
    </div>
  );
};

export default Timeline;
