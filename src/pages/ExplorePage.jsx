import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import PhotoCard from "../components/profile/PhotoCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [allPosts, setAppPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const Posts = await API.graphql(graphqlOperation(listPosts));
      setAppPosts(Posts.data.listPosts.items);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <button className="bg-indigo-600 px-2 py-1 rounded-md text-white fixed left-2 top-10">
          <Link to="/">Back Home</Link>
        </button>
        <div className="flex justify-center mt-16">
          {allPosts.length ? (
            <div className="grid grid-cols-3 gap-8 mt-4 mb-12 pb-8">
              {allPosts.map((post) => {
                return <PhotoCard key={post.id} data={post} />;
              })}
            </div>
          ) : (
            <h1>No post yet</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
