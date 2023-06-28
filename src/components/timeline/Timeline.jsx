/* eslint-disable no-unused-vars */
import { useState } from "react";
import Suggestions from "./suggestions/Suggestions";
import "./Timeline.css";
import Post from "./posts/Post";
import data from "../../data";

const Timeline = () => {
  const [posts, setPosts] = useState(data);
  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline_posts">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>
    </div>
  );
};

export default Timeline;
